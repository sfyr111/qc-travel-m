<template>
	<div class="hotel_room_type_price">
		<div v-for="(item, index) in room" v-if="PaymentToStoreFilter(item.hotelPlans).length">
			<!-- 描述 -->
			<div class="describe font26" @click="showList(item, index)">
				<div class="left bsizing">
					<h2 class="font28">{{ item.name }}</h2>
					<div class="room">
						房间：{{ item.area }}平方 <em>{{ item.floors }}层</em>
					</div>
					<div class="type">
						床型：{{ item.bedDesc }}
					</div> 
				</div>
				<div class="right bsizing red_icon">
					¥<em class="font32">{{ Math.floor(item.lowestAvgPrice) }}</em><i class="color_66">起</i>
					<i class="icon iconfont color_66" v-if="!item.showList">&#xe65e;</i>
					<i class="icon iconfont color_66" v-else>&#xe65d;</i>
				</div>
			</div>

			<!-- 房型房价列表 -->
			<div class="list" v-show="item.showList">
				<ul>
					<li v-for="(val, key) in PaymentToStoreFilter(item.hotelPlans)">
						<div class="container ver-center clearfix border-bottom-dashed border">
							<div class="left fl font26">{{ val.planName }}</div>
							<div class="middle fl bsizing font32 red_icon">
								<em class="font22">¥</em>{{ Math.ceil(val.avgPrice) }}
							</div>
							<button class="right fl font3" v-if="!val.roomStatus" @click="toPreOrder(val, item)">预订</button>
							<button class="right fl font3 no_preorder_btn" v-else>满房</button>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<!-- 全部为到店付款 -->
		<no-data :str="loadNoData" v-if="offlinePay"></no-data>
	</div>
</template>

<style lang="less">
.hotel_room_type_price {
	.describe {
		background: #fff;
		position: relative;
		.left {
			width: 5.4rem;
			padding-left: .35rem;

			h2 {
				padding: .22rem 0 .18rem 0;
				font-weight: bold;
			}

			.room em {
				margin-left: .16rem;
			}

			.type {
				padding: .2rem 0 .28rem 0;
			}
		}

		.right {
			width: 2.1rem;
			position: absolute;
			top: 50%;
			right: .26rem;
			-webkit-transform: translate3d(0, -50%, 0);
			transform: translate3d(0, -50%, 0);
			text-align: right;

			.iconfont {
				margin-left: .3rem;
				font-size: .32rem;
				position: relative;
				top: .05rem;
			}
		}
	}
	
	.list{
		background: #f1f1f1;
		li {
			padding: 0 .25rem;
			.container{
				height: 1.12rem;
				padding: 0 .2rem 0 .1rem;
				.left {
					text-align: left;
					width: 4rem;
				}
				.middle{
					width: 1.75rem;
					text-align: right;
					padding-right: .26rem;
				}
				.right{
					width: 1.04rem;
					height: .68rem;
					background: #e20c1f;
					color: #fff;
					border-radius: .08rem;
				}
				.no_preorder_btn{
					background: #ccc;
				}
			}
		}
	}
}
</style>

<script>
import NoData from '../NoData'
export default {
	props: {
		room: {
			type: Array,
			default: []
		}
	},

	data () {
		return {
			offlinePay: true,			//	全部为到店付款
			loadNoData: '暂无房型可预订'		//	初始化没有数据
		}
	},

	components: {
		NoData
	},

	methods: {
		//	显示隐藏价格列表
		showList (item, index) {
			let msg = {
				obj: item,
				index: index
			}
			this.$emit('show-llist', msg)
		},

		//	过滤到店付款
		PaymentToStoreFilter: function (list) {
			let self = this
			return list.filter(function (item) {
				if (item.payType > 0) {
					self.offlinePay = false
				}
				return item.payType > 0
			})
		},

		//	酒店预订
		toPreOrder (val, item) {
			let msg = {
				child: val, 
				parent: item
			}
			this.$emit('to-order', msg)
		}
	}
}
</script>
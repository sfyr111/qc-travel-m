<template>
	<div class="hotel_list_address_filter hotel_list_filter_box" @click="cancelSelectAddress" v-show="show">
		<div class="main clearfix">
			<div class="side_bar fl">
				<ul>
					<li v-for="(item, index) in sideBar" :class="{'active': index === sideBarIndex}" @click.stop="selectAddressType(index)">
						{{ item }}
					</li>
				</ul>
			</div>
			
			<!-- 商业区 -->
			<div class="content fl business" v-if="!sideBarIndex">
				<ul>
					<li :class="{'active': businessIndex === -1}" @click.stop="selectBusindessArea('', -1, '不限')">
						<div class="border-bottom border clearfix">
							<div class="left fl bsizing overfl-oneline">不限</div>
							<span class="fr right bsizing">
								<i class="icon iconfont">&#xe664;</i>
							</span>
						</div>
					</li>
					<li v-for="(item, index) in business"  :class="{'active': businessIndex === index}" @click.stop="selectBusindessArea(item.id, index, item.name)">
						<div class="border-bottom border clearfix">
							<div class="left fl bsizing overfl-oneline">{{ item.name }}</div>
							<span class="fr right bsizing">
								<i class="icon iconfont">&#xe664;</i>
							</span>
						</div>
					</li>
				</ul>
			</div>

			<!-- 行政区 -->
			<div class="content fl xingzheng" v-else>
				<ul>
					<li :class="{'active': regionIndex === -1}" @click.stop="selectRegionArea('', -1, '不限')">
						<div class="border-bottom border clearfix">
							<div class="left fl bsizing overfl-oneline">不限</div>
							<span class="fr right bsizing">
								<i class="icon iconfont">&#xe664;</i>
							</span>
						</div>
					</li>
					<li v-for="(item, index) in region"  :class="{'active': regionIndex === index}" @click.stop="selectRegionArea(item.id, index, item.name)">
						<div class="border-bottom border clearfix">
							<div class="left fl overfl-oneline bsizing">{{ item.name }}</div>
							<span class="fr right bsizing">
								<i class="icon iconfont">&#xe664;</i>
							</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<button class="confirm border-t border" @click="confirm">确定</button>
	</div>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: false
		},
		//	商业区
		business: {
			type: Array,
			default: []
		},
		//	行政区
		region: {
			type: Array,
			default: []
		},
		cityId: {
			type: String
		}
	},
	data () {
		return {
			sideBar: ['商业区', '行政区'],
			sideBarIndex: 0,							//	商业区行政区选择索引
			businessIndex: -1,						//	商业区选择默认index
			regionIndex: -1,							//	行政区选择默认index
			cbdIdObj: {id: '', name: '不限'},										//	商业区选择对象
			disIdObj: {id: '', name: '不限'},										//	行政区选择对象
		}
	},

	methods: {
		//	关闭位置区域
		cancelSelectAddress () {
			this.$emit('cancel-select-address')
		},

		//	商业区行政区类型选择
		selectAddressType (index) {
			if (this.sideBarIndex === index) {
				return
			}
			this.sideBarIndex = index
		},

		//	选择商业区
		selectBusindessArea (id, index, name) {
			if (this.businessIndex === index) {
				return
			}

			this.businessIndex = index
			this.cbdIdObj = {
				id: id,
				name: name
			}
		},

		//	选择行政区
		selectRegionArea (id, index, name) {
			if (this.regionIndex === index) {
				return
			}

			this.regionIndex = index
			this.disIdObj = {
				id: id,
				name: name
			}
		},

		//	确定按钮
		confirm () {
			let msg = {
				cbdId: this.cbdIdObj,
				disId: this.disIdObj
			}

			//console.log(msg)

			this.$emit('confirm-select-address', msg)
		}
	},

	watch: {
		//	重新选择城市
		cityId (val) {
			console.log(val)
			this.businessIndex = -1
			this.regionIndex = -1
			this.cbdIdObj = {id: '', name: '不限'}
			this.disIdObj = {id: '', name: '不限'}
		}
	}
}
</script>

<style lang="less">
.hotel_list_address_filter {
	.main{
		width: 100%;
		height: 6.5rem;
		background: #fff;

		.side_bar {
			width: 1.6rem;
			height: 100%;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			background: #e6e6e6;
			font-size: .26rem;

			li{
				text-align: center;
				height: .9rem;
				line-height: .9rem;
			}
			li.active{
				background: #fff;
				color: #e20c1f;
				border-left: 2px solid #e20c1f;
			}
		}

		.content{
			width: 5.9rem;
			height: 100%;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;

			li {
				padding-left: .22rem;
				div{
					height: .72rem;
					line-height: .72rem;

					.left {
						padding: 0 .35rem;
						width: 4.9rem;
						max-width: 4.9rem;
					}
					.right{
						padding-right: .32rem;
						width: .72rem;
						display: none;
					}
				}
			}

			li.active{
				color: #e20c1f;

				.right{
					display: block;
				}
			}
		}
	}

	.confirm{
		width: 100%;
		height: .68rem;
		background: #fff;
		font-size: .28rem;
	}
}

</style>
<template>
	<div class="hotel_submit_order bg_ff">
		<div class="border border-t">
			<div class="left fl ver-center font28 bsizing">
				应付金额：&nbsp;<i class="font24 red_icon">¥</i><em class="font3 red_icon">350</em>
			</div>
			<div class="middle fl ver-center font28" @click="moneyDetail">
				费用明细&nbsp;
				<i class="icon iconfont" v-if="!isShowMoneyDetail">&#xe63c;</i>
				<i class="icon iconfont" v-else>&#xe63d;</i>
			</div>
			<div class="right fl ver-middle font3">提交订单</div>

			<!-- 明细 -->
			<div class="money_detail font28" v-if="isShowMoneyDetail" @click="moneyDetail">
				<ul>
					<li class="ver-center">
						<span>房费</span>
						<span class="red_icon">
							<em>¥</em>
							350&nbsp;x1
						</span>
					</li>
					<li class="ver-center">
						<span>服务费</span>
						<span class="red_icon">
							<em>¥</em>
							0
						</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style lang="less">
.hotel_submit_order {
	position: fixed;
	bottom: 0;
	left: 0;

	.left{
		width: 3.4rem;
		height: 1rem;
		padding-left: .35rem;
	}
	.middle {
		width: 1.86rem;
		height: 1rem;
	}
	.right{
		width: 2.24rem;
		height: 1rem;
		color: #fff;
		background: #e20c1f;
	}

	.money_detail {
		position: fixed;
		bottom: 1rem;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);

		ul {
			width: 100%;
			background: #fff;
			position: absolute;
			bottom: 0;
			left: 0;

			li {
				padding: 0 .35rem;
				height: .8rem;

				span {
					width: 6rem;
				}
				span:last-child{
					text-align: right;
				}
			}
		}
	}	
}
</style>

<script>
export default {
	data () {
		return {
			isShowMoneyDetail: false,			//	是否显示费用明细
		}
	},

	methods: {
		moneyDetail () {
			this.isShowMoneyDetail = !this.isShowMoneyDetail
		}
	}
}
</script>
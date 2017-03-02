<template>
	<div>
		<div class="sub_box">
			<span class="sub_price">应付金额：<em>￥750</em></span>
			<span class="sub_detail">费用明细</span>
			<span class="sub_btn">提交订单</span>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.sub_box {
		position: fixed;
		display: flex;
		bottom: 0;
		height: 1.00rem;
		line-height: 1.00rem;
		width: 100%;
		background-color: #ffffff;
		.sub_price {
			flex: 2;
			font-size: .28rem;
			padding: 0 .32rem;
			em {
				color: #ee3535;
			}
		}
		.sub_detail {
			flex: 1;
			text-align: center;
		}
		.sub_btn {
			text-align: center;
			flex: 1;
			font-size: .28rem;
			background-color: #ee3535;
			color: #fff;
		}
	}
</style>
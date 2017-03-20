<template>
	<div class="is_need_invoice bg_ff ver-center">
		<div class="fl title font3">发票</div>
		<div class="fl content font28 color_66">
			<em>{{ isNeedInvoiceArr[Number(isNeedInvoice)] }}</em>
			<select v-model="isNeedInvoice" @change="selectIsNeedInvoice">
				<option value="0">不需要发票</option>
				<option value="1">需要发票（离店后寄出，预计10-15个工作日送达）</option>
			</select>
			<i class="icon iconfont">&#xe65f;</i>

			
		</div>
	</div>
</template>

<style lang="less">
.is_need_invoice {
	padding: 0 .48rem;
	height: .9rem;
	position: relative;
	select {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	.title, .content{
		width: 50%;
	}
	
	.content{
		text-align: right;
	}

	.invoice_box{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		z-index: 100;

		ul {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #fff;

			li {
				height: .7rem;
			}
		}
	}
}
</style>

<script>
export default {
	data () {
		return {
			isNeedInvoice: 0,			//	是否需要发票
			isNeedInvoiceArr: ['不需要发票', '需要发票'],
		}
	},
	methods: {
		selectIsNeedInvoice () {}
	},

	watch: {
		isNeedInvoice (val) {
			this.isNeedInvoice = val
		}
	}
}
</script>
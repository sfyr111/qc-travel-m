<template>
	<div class="pay_no_password" v-if="isShowBox">
		<div class="box bsizing">
			<h3 class="font3">抱歉，您还未设置支付密码，您可以：</h3>
			<p class="font28">
				1.去齐采商旅PC端设置支付密码;<br/>
				2.更换支付方式
			</p>

			<button @click="hideBox">关闭</button>
		</div>
	</div>
</template>

<style lang="less">
.pay_no_password, .pay_input_password {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, .5);
	z-index: 100;
	
	.box {
		width: 6.9rem;
		background: #fff;
		margin: 0 auto;
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate3d(-50%, -50%, 0);
		transform: translate3d(-50%, -50%, 0);
		border-radius: 3px;
		padding: .64rem .9rem .38rem .9rem;

		h3 {
			margin-bottom: .1rem;
		}

		p {
			line-height: .5rem;
		}

		button {
			width: 2rem;
			height: .7rem;
			background: #e30b0f;
			color: #fff;
			font-size: .32rem;
			border-radius: .15rem;
			display: block;
			margin: .5rem auto 0 auto;
		}
	}
}
</style>

<script>
export default {
	data () {
		return {
			isShowBox: false
		}
	},

	methods: {
		//	打开弹窗
		showBox () {
			this.isShowBox = true
		},

		//	关闭弹窗
		hideBox () {
			this.isShowBox = false
		}
	}
}
</script>
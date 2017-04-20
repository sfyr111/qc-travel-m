<template>
	<div class="pay_container">
		<pay-order-info></pay-order-info>

		<!-- 选择支付方式 -->
		<pay-methods></pay-methods>

		<!-- 支付 -->
		<M-D-Button :font="style" :str="str" @btn-click="toPay"></M-D-Button>

		<!-- 没有设置支付密码 -->
		<pay-no-password ref="noPassword"></pay-no-password>

		<!-- 输入支付密码 -->
		<pay-input-password ref="inputpassword" @input-password="inputpasswordConfirm"></pay-input-password>
	</div>
</template>

<script>
import { PayOrderInfo, PayMethods, MDButton, PayNoPassword, PayInputPassword } from '../components'

export default {
	data () {
		return {
			style: {
				width: '4.28rem',
				height: '.78rem',
				background: '#ee3535',
				textAlign: 'center',
				color: '#fff',
				fontSize: '.32rem',
				borderRadius: '.1rem',
				display: 'block',
				margin: '.4rem auto'
			},
			str: '前往支付'
		}
	},
	components: {
		PayOrderInfo,
		PayMethods,
		MDButton,
		PayNoPassword,
		PayInputPassword
	},

	created () {
		document.body.style.background = '#f1f1f1'
	},

	methods: {
		//	前往支付
		toPay () {
			//	未设置支付密码
			//this.$refs.noPassword.showBox()
			this.$refs.inputpassword.showBox()
		},

		//输入密码确定
		inputpasswordConfirm (password) {
			//	关闭密码输入框
			this.$refs.inputpassword.hideBox()

			if (!password) {
				return
			}
			console.log(password)
		}
	}
}
</script>
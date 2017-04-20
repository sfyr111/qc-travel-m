<template>
	<div class="pay_input_password" v-if="isShowBox">
		<div class="box bsizing">
			<h4 class="font3 ">请输入支付密码</h4>

			<div class="password">
				<input class="bsizing" type="password" v-model="password">
			</div>

			<button @click="inpuPasswordConfirm">确定</button>
		</div>
	</div>
</template>

<style lang="less">
.pay_input_password {
	.box {
		padding: .45rem .1rem;
		text-align: center;

		.password {
			margin: .42rem 0 .38rem 0;
			text-align: center;

			input {
				width: 4.9rem;
				height: .7rem;
				border: 1px solid #ddd;
				padding: 0 .2rem;
				text-align: center;
			}


		}

		button {
			border-radius: .06rem;
		}
	}
}
</style>

<script>
export default {
	data () {
		return {
			isShowBox: false,
			password: ''
		}
	},

	methods: {
		//	输入密码确定
		inpuPasswordConfirm () {
			this.$emit('input-password', this.password)
		},

		//	显示密码框
		showBox () {
			this.isShowBox = true
		},

		//	关闭密码框
		hideBox () {
			this.isShowBox = false
		}
	}
}
</script>
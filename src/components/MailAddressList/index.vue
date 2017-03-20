<template>
	<div class="mail_address_list_wrapper fl" :style="{width: width + 'px'}">
		<ul>
			<li v-for="(val, key) in address" class="border-b border" :class="{'active': addressIndex === key}" @click="selectAddress(val, key)">
				{{ key }}
				<i class="icon iconfont">&#xe664;</i>
			</li>
		</ul>
	</div>
</template>

<style lang="less">
.mail_address_list_wrapper {
	height: 100%;
	-webkit-overflow-scrolling: touch;
	overflow-y: auto;
	li{
		padding-left: .4rem;
		height: .88rem;
		line-height: .88rem;
		font-size: .26rem;

		i {
			margin-left: .3rem;
			display: none;
		}
	}

	li.active{
		color: #f23030;

		i{
			display: inline-block;
		}
	}
}
</style>

<script>
export default {
	props: {
		//	地址列表
		address: {
			type: Object,
			default: {}
		},
		//	选择列表索引
		addressIndex: {
			type: String,
			default: ''
		}
	},

	data () {
		return {
			width: document.documentElement.clientWidth
		}
	},

	methods: {
		//	选择地址
		selectAddress (val, key) {
			let msg = {
				name: key,
				id: val
			}
			this.$emit('select-address', msg)
		}
	}
}
</script>
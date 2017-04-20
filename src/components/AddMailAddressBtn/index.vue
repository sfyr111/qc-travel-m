<template>
	<div v-if="!list.length && showBtn">
		<div class="add_mail_address_btn border-t border ver-center bg_ff" @click="addAddress">
			<i class="icon iconfont">&#xe62d;</i>添加邮寄地址
		</div>

		<div class="address_iframe" v-show="show">
			<m-address @save-address-complete="saveAddressComplete"></m-address>
		</div>
	</div>
</template>

<style lang="less">
.add_mail_address_btn{
	padding: 0 .48rem;
	height: .9rem;
	font-size: .28rem;

	i {
		margin-right: .1rem;
		color: red;
		font-size: .36rem;
	}
}
.address_iframe {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 200;
	background: rgb(241, 241, 241);

	iframe {
		width: 100%;
		height: 100%;
		border: none;
	}
}
</style>

<script>
import util from '../../utils/util'
import MAddress from '../../page/MAddress'

export default {
	props: {
		list: {
			type: Array,
			default: []
		},
		showBtn: {
			type: Number,
			default: 0
		},
		refresh: {
			type: Function
		}
	},

	data () {
		return {
			show: false,
			url: ''
		}
	},

	components: {
		MAddress
	},

	created () {
		this.url = util.getRootPath() + '/#/addressModel'
	},

	methods: {
		//	添加邮寄地址
		addAddress () {
			this.show = true
			//window.location.hash = '#123'
		},

		//	添加
		saveAddressComplete () {
			//console.log('保存地址完成')
			this.refresh()
			this.show = false
		}
	}
}
</script>
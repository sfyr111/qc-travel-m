<template>
	<div class="hotel_mail_address_list" v-show="invoice">
		<ul v-if="list.length">
			<li v-for="(item, index) in list" class="bg_ff" @click="selectAddress(item, index)">
				<div class="border" :class="[index === 0 ? 'border-t' : 'border-top']">
					<h2 class="font28">
						{{ item.provinceName + ' ' + item.cityName + ' ' + item.areaName }}
					</h2>
					<p class="font26 color_66">
						{{ item.address + ' ' + item.phone }}
					</p>
					<i class="icon iconfont checked" v-if="tabIndex === index">&#xe62b;</i>
					<i class="icon iconfont empty" v-else>&#xe61a;</i>
				</div>
			</li>
		</ul>
	</div>
</template>

<style lang="less">
.hotel_mail_address_list li{
	padding: 0 .48rem;

	div {
		padding: .2rem .2rem .2rem .55rem;

		h2 {
			margin-bottom: .2rem;
		}

		i {
			position: absolute;
			top: 50%;
			left: 0;
			-webkit-transform: translate3d(0, -50%, 0);
			transform: translate3d(0, -50%, 0);
			font-size: .36rem;
		}

		i.checked {
			color: #32abfb;
		}
		i.empty{
			color: #e6e6e6;
		}
	}
}

.hotel_mail_address_list li:last-child{
	margin-bottom: .2rem;
}


</style>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: []
		},
		//	是否需要发票
		invoice: {
			type: Number,
			default: 0
		}
	},

	data () {
		return {
			tabIndex: 0
		}
	},

	methods: {
		//	选择邮寄地址
		selectAddress (item, index) {
			if (this.tabIndex === index) {
				return
			}

			this.tabIndex = index

			this.$emit('select-mail-address', item)
		},

		//	
	}
}
</script>
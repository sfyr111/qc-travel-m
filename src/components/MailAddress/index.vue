<template>
	<div>
		<div class="mail_address" v-show="show" @click="cancelSelelctEmailAddress">
		</div>
		<div class="mail_address_wrapper" :class="[show ? 'slide_up' : 'slide_down']">
			<!-- tab列表 -->
			<tab :tab-list="navList" :tab-index="tabIndex" @tab-click="tabClick"></tab>
			
			<div class="mail_address_list clearfix" :style="slide">
				<!-- 省份列表 -->
				<mail-address-list
				:address="province"
				:address-index="provinceIndex"
				@select-address="selectProvince"
				>
				</mail-address-list>

				<!-- 城市列表 -->
				<mail-address-list
				:address="city"
				:address-index="cityIndex"
				@select-address="selectCity"
				>
				</mail-address-list>

				<!-- 区域列表 -->
				<mail-address-list
				:address="area"
				:address-index="areaIndex"
				@select-address="selectArea"
				>
				</mail-address-list>
			</div>
		</div>
	</div>
</template>

<style lang="less">
.mail_address {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: black;
	opacity: .5;
	z-index: 100;
}

.mail_address_wrapper {
	position: fixed;
	bottom: -6.28rem;
	left: 0;
	background: #fff;
	width: 100%;
	height: 6.16rem;
	z-index: 110;

	.mail_address_list {
		width: 99999px;
		position: absolute;
		top: .88rem;
		bottom: 0;
		left: 0;
	}
}

/* --- 动画 --- */
.fade_in {
	transition: all .15s ease;
	-webkit-transition: all .15s ease;
	opacity: .5;
	z-index: 100;
}
.fade_out {
	transition: all .15s ease;
	-webkit-transition: all .15s ease;
	opacity: 0;
	z-index: -10;
}
.slide_up {
	transition: all .2s ease-out;
	-webkit-transition: all .2s ease-out;
	transform: translate3d(0, -100%, 0);
	-webkit-transform: translate3d(0, -100%, 0);
}
.slide_down {
	transition: all .2s ease-out;
	-webkit-transition: all .2s ease-out;
	transform: translate3d(0, 0, 0);
	-webkit-transform: translate3d(0, 0, 0);
}
</style>

<script>
import Tab from '../Tab'
import MailAddressList from '../MailAddressList'


export default {
	props: {
		navList: {
			type: Array,
			default: [{name: '请选择', id: ''}]
		},
		show: {
			type: Boolean,
			default: false
		},
		province: {
			type: Object,
			default: {}
		},
		city: {
			type: Object,
			default: {}
		},
		area: {
			type: Object,
			default: {}
		}
	},
	data () {
		return {
			tabIndex: 0,			//	选择省市区tab索引
			provinceIndex: '', //	选择省份列表索引
			cityIndex: '',			//	选择城市列表索引
			areaIndex: '',			//	选择区域列表索引
			slide: {},					//	切换动画
			width: -document.documentElement.clientWidth
		}
	},

	components: {
		Tab,
		MailAddressList
	},

	methods: {
		//	退出选择地址
		cancelSelelctEmailAddress () {
			this.$emit('cancel-address')
		},

		//	选择省市区索引
		tabClick (index) {
			this.tabIndex = index
			this.$emit('tab-click', index)

			//	切换动画
			this.slideAanimate(index)
		},

		//	选择省份
		selectProvince (msg) {
			//console.log(msg)
			this.provinceIndex = msg.name
			this.$emit('select-province', msg)

			//	切换动画
			this.slideAanimate(this.tabIndex + 1)
		},

		//	选择城市
		selectCity (msg) {
			this.cityIndex = msg.name
			this.$emit('select-city', msg)

			//	切换动画
			this.slideAanimate(this.tabIndex + 1)
		},

		//	选择区域
		selectArea (msg) {
			this.areaIndex = msg.name
			this.$emit('select-area', msg)
		},

		//	slide动画
		slideAanimate (tabIndex) {
			let m = this.width * tabIndex + 'px'

			if (tabIndex !== 0) {
				this.$el.querySelectorAll('.mail_address_list_wrapper')[tabIndex].scrollTop = 0
			}

			this.slide = {
				'-webkit-transition': '.3s',
				'transition': '.3s',
				'-webkit-transform': 'translate3d('+ m +', 0, 0)',
				'transform': 'translate3d('+ m +', 0, 0)'
			}
		}
	},

	watch: {
		show (val) {
			if (val) {
				document.querySelector('body').classList.add('body_overflow')
				document.querySelector('html').classList.add('body_overflow')
			}
			else {
				document.querySelector('body').classList.remove('body_overflow')
				document.querySelector('html').classList.remove('body_overflow')
			}
		},

		navList (val) {
			this.tabIndex = val.length - 1
		}	
	}
}
</script>
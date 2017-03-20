<template>
	<div>
		<div class="addr_box">
			<div class="addr_row">
				<span>发票抬头</span>
				<div class="addr_r">
					<input type="text" v-model="invoiceTitle">
				</div>
			</div>
			<div class="addr_row">
				<span>收件人</span>
				<div class="addr_r">
					<input type="text" v-model="recipientsName">
				</div>
			</div>
			<div class="addr_row" @click="showMailAddressBox">
				<span>所在地区</span>
				<div class="addr_r">
					{{ showEmailAddress }}
				</div>
			</div>
			<div class="addr_row">
				<span>地址</span>
				<div class="addr_r">
					<input type="text" v-model="address">
				</div>
			</div>
			<div class="addr_row">
				<span>联系手机</span>
				<div class="addr_r">
					<input type="number" max-length="11" class="email_address_phone">
				</div>
			</div>
		</div>

		<M-D-Button :font="style" :str="str" @btn-click="btnClick"></M-D-Button>

		<!-- 选择省市区 -->
		<mail-address
		:nav-list="tabList"
		:show="isShowMailAddressBox"
		:province="getEmailAddressProvince"
		:city="getEmailAddressCity"
		:area="getEmailAddressArea"
		@cancel-address="cancelAddress"
		@select-province="selectProvince"
		@select-city="selectCity"
		@select-area="selectArea"
		@tab-click="tabClick"
		></mail-address>
	</div>
</template>
<style lang="less" scoped>
	.addr_box {
		margin: .20rem;
		padding: 0 .30rem;
		border-radius: .06rem;
		background-color: #ffffff;
		font-size: .28rem;
		.addr_row {			
			display: flex;
			line-height: .90rem;
			border-bottom: 1px solid #bbbbbb;
			&:last-child {
				border-bottom: none;
			}
			span {
				flex: 1;
				color: #676767;
			}
			.addr_r {
				flex: 3;
				input {
					width: 100%;
					height: 100%;
				}
				select {
					width: 90%;
					height: 100%;
				}
			}
		}
	}
</style>
<script>
	import { Group, XAddress, ChinaAddressData } from 'vux'
	import { MDButton, MailAddress, showTips } from '../../components'
	import { mapActions, mapGetters } from 'vuex'
	import configUrl from '../../data/configUrl'

	export default {
		components: {
			Group, 
			XAddress,
			MDButton,
			MailAddress,
			showTips
		},
		data () {
			return {
				style: {
					'padding': '0 3.00rem',
					height: '.8rem',
					'font-size': '.32rem',
					'color': '#ffffff',
					background: '#ee3535',
					'margin': '.5rem auto .5rem auto',
					display: 'block',
					'border-radius': '.1rem'
				},									//	按钮样式
				str: '保存',		//	按钮内容
				invoiceTitle: '',
        recipientsName: '',
        phone: '',
        postCode: '',
        address: '',         
        invoiceId: '',       
        province: {},
        city: {},
        area: {},
        title2: '',
        addressData: ChinaAddressData,
        value2: ['广东省', '深圳市', '南山区'],

        showEmailAddress: '',										//	显示地址				
        tabList: [{name: '请选择', id:''}],     //	选择地址头部标题
        isShowMailAddressBox: false,	//	是否显示	
        isInitProvince: true,					//	初始化省份
        mailAddressCityUrl: configUrl.getAllCity.dataUrl,		//	查询城市Url 
        mailAddressAreaUrl: configUrl.getAllArea.dataUrl,		//	查询区域Url
        addressSaveUrl: configUrl.addressSave.dataUrl,				//	保存邮寄地址URL
        isCanSaveAddress: true,																//	保存地址节流    
			}
		},
		methods: {
			// vuex actions
			...mapActions(['emailAddressProvince', 'emailAddress', 'saveEmailAddress']),

			//	保存邮寄地址
			btnClick () {
				//	发票抬头为空
				if (!this.invoiceTitle) {
					showTips('发票抬头不能为空', 2500)
					return
				}

				//	收件人为空
				if (!this.recipientsName) {
					showTips('收件人不能为空', 2500)
					return
				}

				//所在地区为空
				if (!this.showEmailAddress) {
					showTips('所在地区不能为空', 2500)
					return
				}

				//详细地址为空
				if (!this.address) {
					showTips('详细地址不能为空', 2500)
					return
				}

				//	电话号码为空
				let phone = this.$el.querySelector('.email_address_phone').value
				if (!phone) {
					showTips('手机号码不能为空', 2500)
					return
				}

				//	手机号码不正确
				if (phone.length !== 11) {
					showTips('请输入正确的手机号码', 2500)
					return
				}

				if (!this.isCanSaveAddress) {
					return
				}

				this.isCanSaveAddress = false

				let self = this
				let opt = {
					type: 'get',
					url: this.addressSaveUrl,
					data: {
						invoiceTitle: this.invoiceTitle,
						recipientsName: this.recipientsName,
						phone: phone,
						provinceId: this.tabList[0].id,
						cityId: this.tabList[1].id,
						areaId: this.tabList[2].id,
						provinceName: this.tabList[0].name,
						cityName: this.tabList[1].name,
						areaName: this.tabList[2].name,
						address: this.address
					},
					errMsg: '出错了，请稍后再试',
					success: function (res) {
						console.log(res)
						self.$router.go(-1)
					},
					fail: function (res) {
						showTips(res, 2500)
						this.isCanSaveAddress = true
					}
				}

				this.saveEmailAddress(opt)
			},

			//	弹出选择地址
			showMailAddressBox () {
				this.isShowMailAddressBox = true
				//	初始化省份
				this.intProvince()
			},

			//	取消选择邮寄地址
			cancelAddress () {
				this.isShowMailAddressBox = false
			},

			//	初始化省份
			intProvince () {
				if (!this.isInitProvince) {
					return
				}

				this.isInitProvince = false

				let self = this
				let opt = {
					type: 'get',
					data: {},
					url: configUrl.getAllProvince.dataUrl,
					errMsg: '获取省份失败',
					success: function (res) {
						console.log(res)
					},
					fail: function (res) {
						showTips(res)
						self.isInitProvince = true
					}
				}

				this.emailAddressProvince(opt)
			},

			//	查询城市或区域
			checkEmailAddressCity (data, url, errMsg) {
				let opt = {
					type: 'get',
					data: data,
					url: url,
					errMsg: errMsg,
					success: function (res) {
						console.log(res)
					},
					fail: function (res) {
						showTips(res)
					}
				}

				this.emailAddress(opt)
			},

			//	选择省份  查询城市
			selectProvince (msg) {
				let opt = {
					name: '请选择',
					id: ''
				}
				this.tabList = []
				this.tabList.push(msg)
				this.tabList.push(opt)
				
				//	查询城市
				let data = {
					provinceId: msg.id
				}
				this.checkEmailAddressCity(data, this.mailAddressCityUrl, '查询城市失败')
			},

			//	选择城市 查询区域
			selectCity (msg) {
				let obj = {
					name: msg.name,
					id: msg.id
				}
				let opt = {
					name: '请选择',
					id: ''
				}

				this.$set(this.tabList, 1, obj)
				this.$set(this.tabList, 2, opt)

				//	查询区域
				let data = {
					cityId: msg.id
				}
				this.checkEmailAddressCity(data, this.mailAddressAreaUrl, '查询区域失败')
			},

			//	选择区域  完成
			selectArea (msg) {
				let obj = {
					name: msg.name,
					id: msg.id
				}
				this.$set(this.tabList, 2, obj)
				this.isShowMailAddressBox = false
				console.log(this.tabList)

				let arr = []
				this.tabList.forEach(function (item) {
					arr.push(item.name)
				})
				this.showEmailAddress = arr.join(' ')
				
			},

			// tab点击
			tabClick (index) {
				this.tabList = this.tabList.slice(0, index)
				let opt = {
					name: '请选择',
					id:''
				}

				this.$set(this.tabList, index, opt)
			}
		},

		computed: {
			...mapGetters(['getEmailAddressProvince', 'getEmailAddressCity', 'getEmailAddressArea'])
		}
	}
</script>
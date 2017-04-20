<template>
	<div class="hotel_pre_order_container">
		<!-- 房型信息 -->
		<hotel-pre-order-room-info></hotel-pre-order-room-info>
		
		<!-- 酒店入住信息 -->
		<hotel-check-info ref="checkInfo" :num="getHotelRoomNum" @select-room-num="selectRoomNum"></hotel-check-info>

		<!-- 是否需要发票 -->
		<hotel-is-need-invoice @is-need-invoice="isNeedInvoice"></hotel-is-need-invoice>

		<!-- 邮寄地址列表 -->
		<hotel-mail-address-list
		:list="getAddressList"
		@select-mail-address="selectMailAddress"
		:invoice="invoice"
		></hotel-mail-address-list>

		<!-- 添加邮寄地址 -->
		<add-mail-address-btn
		:list="getAddressList"
		:show-btn="invoice"
		:refresh="checkAddressList"
		></add-mail-address-btn>

		<!-- 提交订单 -->
		<hotel-submit-order
		:price="price"
		:total="totalFee"
		:room-num="guestNum"
		:days="days"
		@submit-order="submitOrder"
		v-if="getHotelRoomNum"
		></hotel-submit-order>
	</div>
</template>

<style lang="less">
.hotel_pre_order_container {
	padding-bottom: 1rem;
}
</style>

<script>
import { HotelPreOrderRoomInfo, HotelCheckInfo, HotelIsNeedInvoice, HotelSubmitOrder, HotelMailAddressList, showTips, AddMailAddressBtn } from '../components'
import configUrl from '../data/configUrl'
import { mapActions, mapGetters } from 'vuex'
import util from '../utils/util'

export default {
	data () {
		return {
			checkRoomNumUrl: configUrl.checkHotelRoomNum.dataUrl,		//	房间数量URL
			queryAddressListUrl: configUrl.addressList.dataUrl,		//	查询发票数量地址
			preOrderUrl: configUrl.hotelPreOrder.dataUrl,					//	酒店预下单
			hotelId: '',								//	酒店id
			hotelName: '',							//	酒店名称
			hotelPhone: '',							//	酒店电话
			roomTypeId: '',							//	房型id
			pricePlanId: '',						//	价格计划id
			checkInDate: '',						//	入住日期
			checkOutDate: '',						//	离开时间
			cityId: '',									//	酒店所属城市Id
			cityName: '',								//	酒店所属城市名称
			address: '',								//	酒店地址
			roomTypeName: '',						//	房型名称
			star: '',										//	星级
			serviceFee: 0,								//	服务费
			supplierType: '',							//	供应商类型:1艺龙 2携程
			payType: 1,											//	0.现付 1.预付
			invoice: 0,											//	是否需要发票
			invoiceId: '',									//	发票地址id
			invoiceJson: {},									//	发票信息
			guestNum: 1,										//	房间数量
			totalFee: 0,										//	总价钱
			price: 0,												//	房间单价
			days: 1,												//	住多少天
			guestName: [],									//	入住人
		}
	},
	components: {
		HotelPreOrderRoomInfo,
		HotelCheckInfo,
		HotelIsNeedInvoice,
		HotelSubmitOrder,
		HotelMailAddressList,
		AddMailAddressBtn
	},

	created () {
		document.body.style.background = '#f1f1f1'
		let query = this.$route.query
		let hotelOrderInfo = JSON.parse(sessionStorage.getItem('hotelOrderInfoObj'))

		this.hotelId = hotelOrderInfo.hotelId
		this.hotelName = hotelOrderInfo.hotelName
		this.roomTypeId = hotelOrderInfo.roomTypeId
		this.pricePlanId = hotelOrderInfo.pricePlanId
		this.checkInDate = hotelOrderInfo.checkInDate
		this.checkOutDate = hotelOrderInfo.checkOutDate
		this.cityId = hotelOrderInfo.cityId
		this.cityName = hotelOrderInfo.cityName
		this.address = hotelOrderInfo.address
		this.star = query.star
		this.roomTypeName = hotelOrderInfo.titleName
		this.hotelPhone = hotelOrderInfo.hotelPhone
		this.supplierType = hotelOrderInfo.supplierType
		this.totalFee = hotelOrderInfo.price
		this.price = hotelOrderInfo.price

		this.days = util.getDays(this.checkInDate, this.checkOutDate, '-')
		this.totalFee = this.price * this.days

		//	查询房间数量
		this.initRoomNum()

		//	查询发票地址
		this.checkAddressList()
	},

	methods: {
		...mapActions(['checkHotelRoomNum', 'addressList', 'hotelPreOrder']),

		//	查询房间数量
		initRoomNum () {
			let opt = {
				type: 'get',
				url: this.checkRoomNumUrl,
				errMsg: '获取酒店房间数失败',
				data: {
					hotelId: this.hotelId,
					roomTypeId: this.roomTypeId,
					pricePlanId: this.pricePlanId,
					checkInDate: this.checkInDate,
					checkOutDate: this.checkOutDate,
					supplierType: this.supplierType,
					payType: 1
				},
				success: function (res) {
					console.log(res)
				},
				fail: function (res) {
					showTips('获取酒店房间数失败')
				}
			}

			this.checkHotelRoomNum(opt)
		},

		//	查询发票地址
		checkAddressList () {
			let self = this
			let opt = {
				type: 'get',
				url: this.queryAddressListUrl,
				data: {},
				success: function (res) {
					//console.log(res)
					self.setMailAddressParams(res[0])
				},
				fail: function () {
					console.log('查询发票地址失败')
				}
			}


			this.addressList(opt)
		},

		//	选择房间数量
		selectRoomNum (num) {
			this.guestNum = num
			this.totalFee = this.price * this.days * num
		},

		//	选择邮寄地址
		selectMailAddress (opt) {
			this.invoiceId = opt.invoiceId

			//	设置邮寄地址参数
			this.setMailAddressParams(opt)
		},

		//	设置邮寄地址参数
		setMailAddressParams (opt) {
			if (!opt) {
				this.invoiceJson = {
					title: '',
					recipientName: '',
					phone: '',
					provinceId: '',
					cityId: '',
					areaId: '',
					address: '',
					postCode: ''
				}
				return
			}
			this.invoiceJson = {
				title: opt.invoiceTitle || '',
				recipientName: opt.recipientsName || '',
				phone: opt.phone || '',
				provinceId: opt.provinceId || '',
				cityId: opt.cityId || '',
				areaId: opt.areaId || '',
				address: opt.address || '',
				postCode: opt.postCode || ''
			}

			this.invoiceId = opt.invoiceId
		},


		//	是否需要发票地址
		isNeedInvoice (need) {
			this.invoice = need
		},


		//	提交订单
		submitOrder () {
			//	检查入住人
			let checkInfo = this.$refs.checkInfo
			if (!checkInfo.getlivePersonArr().isComplete) {
				showTips('请填写入住人', 2500)
				return 
			}
			else {
				this.guestName = checkInfo.getlivePersonArr().arr
			}

			//	检查电话号码
			let phone = this.$refs.checkInfo.phone
			console.log(phone.toString().length)
			if (!phone || phone.toString().length !== 11) {
				showTips('请填写正确的手机号码', 2500)
				return
			}

			let params = {
				hotelId: this.hotelId,
				hotelName: this.hotelName,
				roomTypeId: this.roomTypeId,
				pricePlanId: this.pricePlanId,
				checkInDate: this.checkInDate,
				checkOutDate: this.checkOutDate,
				guestNum: this.guestNum,
				totalFee: this.totalFee,
				guestName: this.guestName,
				conName: this.guestName[0],
				conPhone: phone,
				cityId: this.cityId,
				cityName: this.cityName,
				address: this.address,
				serviceFee: this.serviceFee,
				supplierType: this.supplierType,
				payType: this.payType,
				roomTypeName: this.roomTypeName,
				hotelPhone: this.hotelPhone,
				star: this.star,
				invoice: this.invoice,
				invoiceId: this.invoiceId,
				invoiceJson: this.invoiceJson
			}

			let self = this
			let opt = {
				type: 'post',
				url: this.preOrderUrl,
				data: JSON.stringify(params),
				errMsg: '下单失败，请稍后再试',
				success: function (res) {
					console.log(res)
					self.$router.push({
						name: 'pay'
					})
				},
				fail: function (res) {
					showTips(res)
				}
			}

			this.hotelPreOrder(opt)
		}
	},

	computed: {
		...mapGetters(['getHotelRoomNum', 'getAddressList'])
	}
}
</script>
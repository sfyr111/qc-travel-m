<template>
	<div class="hotel_pre_order_container">
		<!-- 房型信息 -->
		<hotel-pre-order-room-info></hotel-pre-order-room-info>
		
		<!-- 酒店入住信息 -->
		<hotel-check-info></hotel-check-info>

		<!-- 是否需要发票 -->
		<hotel-is-need-invoice></hotel-is-need-invoice>

		<!-- 邮寄地址列表 -->
		<hotel-mail-address-list></hotel-mail-address-list>

		<!-- 提交订单 -->
		<hotel-submit-order></hotel-submit-order>
	</div>
</template>

<style lang="less">
.hotel_pre_order_container {
	padding-bottom: 1rem;
}
</style>

<script>
import { HotelPreOrderRoomInfo, HotelCheckInfo, HotelIsNeedInvoice, HotelSubmitOrder, HotelMailAddressList } from '../components'

export default {
	components: {
		HotelPreOrderRoomInfo,
		HotelCheckInfo,
		HotelIsNeedInvoice,
		HotelSubmitOrder,
		HotelMailAddressList
	},

	created () {
		document.body.style.background = '#f1f1f1'
	}
}
</script>
<template>
	<div class="hotel_pre_order_room_info">
		<div class="bg_ff color_66">
			<h1 class="font32 color_33">{{ hotelName }}</h1>
			<div class="type">{{ titleName }}</div>
			<div>
				<span>入住：{{ checkInDate }}</span>
				<span>离店：{{ checkOutDate }}</span>
			</div>
			<p>{{ bedDesc }}<em>{{ planName }}</em></p>
		</div>
	</div>
</template>

<style lang="less">
.hotel_pre_order_room_info {
	padding: .2rem;

	.bg_ff {
		padding: 0 .28rem;
		border-radius: .1rem;
	}
	.type{
		font-weight: bold;
		margin-bottom: .2rem;
	}
	h1 {
		font-weight: bold;
		padding-top: .2rem;
	}
	span:first-child{
		margin-right: .2rem;
	}
	p {
		padding: .2rem 0 .28rem 0;
		em {
			margin-left: .16rem;
		}
	}
}
</style>

<script>
export default {
	data () {
		return {
			hotelName: '',
			titleName: '',
			checkInDate: '',
			checkOutDate: '',
			bedDesc: '',
			planName: ''
		}
	},

	created () {
		let hotelInfo = JSON.parse(sessionStorage.getItem('hotelOrderInfoObj'))
		this.hotelName = hotelInfo.hotelName
		this.titleName = hotelInfo.titleName
		this.checkInDate = hotelInfo.checkInDate
		this.checkOutDate = hotelInfo.checkOutDate
		this.bedDesc = hotelInfo.bedDesc
		this.planName = hotelInfo.planName
	}
}
</script>
<template>
	<transition name="slide">
		<div class="hotel_profile_tools">
			<div class="profile bg_ff">
				<h2 class="border-b border font3">
					酒店简介
				</h2>
				<div class="font26 content"  v-if="profileTools.baseInfo">
					{{ profileTools.baseInfo.memo }}...
				</div>
			</div>

			<div class="profile bg_ff">
				<h2 class="border-b border font3">
					设施和服务
				</h2>
				<div class="font26 content">
					<div v-for="(item, index) in profileTools.relatedInfos">
						<h3 v-html="getInfoType(item.infoType)"></h3>
						<p v-html="item.overview"></p>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<style lang="less">
.hotel_profile_tools {
	position: absolute;
	top: 0;
	left: 0;
	background: #f6f6f6;
	width: 100%;
	min-height: 100%;
	z-index: 100;
	
	.profile {
		padding: 0 .3rem;

		h2 {
			padding: .2rem 0;
			font-weight: bold;
		}

		.content{
			padding: .15rem 0;
			line-height: .4rem;
			text-align: justify;
			div {
				margin-bottom: .15rem;
			}

			h3 {
				padding: .05rem 0 .2rem 0;
				font-size: .26rem;
				font-weight: bold;
			}
		}
	}
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex'
import configUrl from '../data/configUrl'

export default {
	data () {
		return {
			profileTools: {},		//	酒店简介以及设施
			hotelId: '',
			checkInDate: '',
			checkOutDate: '',
			detailUrl: configUrl.hotelDetail.dataUrl,		//	酒店详情URL
			roomTypePriceUrl: configUrl.hotelRoomTypePrice.dataUrl, // 房型房价URL
		}
	},
	created () {
		document.title = '酒店信息'
		document.body.scrollTop = 0
		let query = this.$route.query
		this.hotelId = query.hotelId
		this.checkInDate = query.checkInDate
		this.checkOutDate = query.checkOutDate
		if (typeof this.getHotelDetail.relatedInfos === 'undefined') {
			//	页面刷新初始化酒店详情
			this.initDetail()
			this.checkHotelRoomTypePrice()
		}
		//	页面没有刷新  则存在
		else {
			this.profileTools = this.getHotelDetail
		}
	},

	methods: {
		//	vuex actions
		...mapActions(['hotelDetail', 'setHotelRoomTypePrice']),

		//	获取设施type
		getInfoType: function (num) {
			var arr = [
				'',
				'接机信息',
				'酒店服务设施',
				'房间服务设施',
				'休闲服务设施',
				'会议服务设施',
				'餐饮服务设施',
				'周边交通信息',
				'周边商务信息',
				'周边餐饮信息',
				'周边景致信息',
				'周边购物信息',
				'酒店特色信息',
				'酒店附近标志物',
				'周边信息',
				'酒店介绍'
			]
			return arr[num]
		},

		//	初始化酒店详情
		initDetail () {
			let self = this
			let opt = {
				type: 'get',
				url: this.detailUrl,
				errMsg: '获取酒店信息失败',
				data: {
					hotelId: this.hotelId,
					checkInDate: this.checkInDate,
					checkOutDate: this.checkOutDate
				},
				success: function (resp) {
					console.log('获取酒店简介设施成功')
					self.profileTools = resp
				},
				fail: function (msg) {
					alert(msg)
				}
			}

			this.hotelDetail(opt)
		},

		//	查询酒店房型房价信息
		checkHotelRoomTypePrice () {
			let opt = {
				type: 'get',
				url: this.roomTypePriceUrl,
				errMsg: '查询房型房价失败',
				data: {
					hotelId: this.hotelId,
					checkInDate: this.checkInDate,
					checkOutDate: this.checkOutDate
				},
				success: function (res) {
					console.log('查询房型房价成功')
				},
				fail: function (err) {
					alert(err)
				}
			}

			this.setHotelRoomTypePrice(opt)
		},

	},

	computed: {
		...mapGetters(['getHotelDetail'])
	}
}
</script>
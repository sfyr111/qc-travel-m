<template>
	<div class="hotel_detail">
		<!-- 酒店banner -->
		<hotel-detail-banner v-if="getHotelDetail.baseInfo && getHotelDetail.pictures" :base-info="getHotelDetail.baseInfo" :pictures="getHotelDetail.pictures"></hotel-detail-banner>

		<!-- 酒店点评item -->
		<hotel-detail-item @item-click="toComment" v-if="getHotelDetail.level">
			<div slot="left" class="red_icon">
				<em class="font3">{{ getHotelDetail.level.averageScore }}</em><em>分</em>
				<em class="color_66">{{ getHotelDetail.level.allComment }}条点评</em>
			</div>
			<span slot="right">
				点评
				<i class="icon iconfont">&#xe620;</i>
			</span>
		</hotel-detail-item>

		<!-- 酒店地图item -->
		<hotel-detail-item class="border_none" v-if="getHotelDetail.baseInfo">
			<div slot="left" class="color_33 overfl-oneline">
				{{ getHotelDetail.baseInfo.address }}
			</div>
			<span slot="right">
				地图
				<i class="icon iconfont">&#xe620;</i>
			</span>
		</hotel-detail-item>

		<!-- 住店离店日期 -->
		<column-button class="hotel_search_button border-bottom border">
			<button class="flex_btn clearfix">
				<span class="fl color_66 bsizing">入住</span>
				<span class="fr">{{ showStartDate }}</span>
			</button>
			<button class="flex_btn clearfix">
				<span class="fl color_66 bsizing ver-middle">离店</span>
				<span class="fr">{{ showEndDate }}</span>
			</button>
		</column-button>

		<!-- 房型房价 -->
		<hotel-room-type-price
		v-if="getHotelRoomTypePrice.hotelRooms"
		:room="getHotelRoomTypePrice.hotelRooms"
		@show-llist="showRoomTypeList"
		></hotel-room-type-price>

		<!-- 酒店简介设施item -->
		<hotel-detail-item class="border_none hotel_facilities_intr" @item-click="toProfile">
			<div slot="left" class="color_33 overfl-oneline">
				酒店简介/设施服务
			</div>
			<span slot="right">
				详情
				<i class="icon iconfont">&#xe620;</i>
			</span>
		</hotel-detail-item>
	</div>
</template>

<script>
import {
	HotelDetailBanner,
	HotelDetailItem,
	ColumnButton,
	HotelRoomTypePrice,
} from '../components'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import configUrl from '../data/configUrl'

export default {
	data () {
		return {
			hotelId: '',
			checkInDate: '',
			checkOutDate: '',
			detailUrl: configUrl.hotelDetail.dataUrl,		//	酒店详情URL
			roomTypePriceUrl: configUrl.hotelRoomTypePrice.dataUrl, // 房型房价URL
			showStartDate: '',													//	显示酒店住店日期
			showEndDate: '',														//	显示酒店离店日期
		}
	},

	created () {
		let query = this.$route.query
		this.hotelId = query.hotelId
		this.checkInDate = query.checkInDate
		this.checkOutDate = query.checkOutDate

		let arr1 = this.checkInDate.split('-')
		let arr2 = this.checkOutDate.split('-')
		this.showStartDate = arr1[1] + '月' + arr1[2] + '日'
		this.showEndDate = arr2[1] + '月' + arr2[2] + '日'

		//	页面刷新了或第一次进入页面初始化数据
		if (typeof this.getHotelDetail.relatedInfos === 'undefined') {
			//	初始化酒店详情
			this.initDetail()

			//	初始化酒店房型房价信息
			this.checkHotelRoomTypePrice()
		}
		
	},

	mounted () {
		document.body.style.background = '#eee'
	},
	components: {
		HotelDetailBanner,
		HotelDetailItem,
		ColumnButton,
		HotelRoomTypePrice,
	},

	methods: {
		//	vuex actions
		...mapActions(['hotelDetail', 'setHotelRoomTypePrice']),

		//	vuex mutations
		...mapMutations(['SHOWHOTELROOMTYPEPRICELIST']),

		//	初始化酒店详情
		initDetail () {
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
					console.log('获取详情成功')
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

		//	酒店简介设施
		toProfile () {
			this.$router.push({
				name: 'hotelprofiletools',
				replace: true,
				query: {
					hotelId: this.hotelId,
					checkInDate: this.checkInDate,
					checkOutDate: this.checkOutDate
				}
			})
		},
		//	酒店评论
		toComment () {
			let comment = this.getHotelDetail.level
			this.$router.push({
				name: 'hotelcomment',
				replace: true,
				query: {
					allComment: comment.allComment,
					good: comment.good,
					mid: comment.mid,
					bad: comment.bad,
					averageScore: comment.averageScore,
					hotelId: this.hotelId
				}
			})
		},

		//	显示房型房价对应列表
		showRoomTypeList (msg) {
			let showList = null
			if (typeof msg.obj.showList === 'undefined') {
				showList = true
			}
			else {
				showList = !msg.obj.showList
			}

			let opt = {
				showList: showList,
				index: msg.index
			}
			let obj = Object.assign(msg.obj, opt)

			//	显示对应房型房价
			this.SHOWHOTELROOMTYPEPRICELIST(obj)
		}
	},

	computed: {
		...mapGetters(['getHotelDetail', 'getHotelRoomTypePrice'])
	}
}
</script>

<style lang="less">
.hotel_detail {
	.hotel_search_button{
		background: #fff;
		height: .8rem;
		
		margin-top: .2rem;
		.flex_btn{
			line-height: .8rem;
			height: .8rem;
			span:first-child{
				width: 1.2rem;
				padding-left: .35rem;
				text-align: left;
			}
			span:last-child{
				width: 2.55rem;
				text-align: center;
			}
		}
	}
	.hotel_facilities_intr  {
		margin-top: .2rem;
		.hotel_detail_item_container{
			height: 1rem;
		}
	}
}
</style>
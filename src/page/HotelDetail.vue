<template>
	<div class="hotel_detail">
		<!-- 酒店banner -->
		<hotel-detail-banner></hotel-detail-banner>

		<!-- 酒店点评item -->
		<hotel-detail-item @item-click="toComment">
			<div slot="left" class="red_icon">
				<em class="font3">4.6</em><em>分</em>
				<em class="color_66">1203条点评</em>
			</div>
			<span slot="right">
				点评
				<i class="icon iconfont">&#xe620;</i>
			</span>
		</hotel-detail-item>

		<!-- 酒店地图item -->
		<hotel-detail-item class="border_none">
			<div slot="left" class="color_33 overfl-oneline">
				深南中路（第一打开撒君多三撒君多三撒君多三）
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
				<span class="fr">01-01</span>
			</button>
			<button class="flex_btn clearfix">
				<span class="fl color_66 bsizing ver-middle">离店</span>
				<span class="fr">01-01</span>
			</button>
		</column-button>

		<!-- 房型房价 -->
		<hotel-room-type-price></hotel-room-type-price>

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

export default {
	data () {
		return {
			
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
		//	酒店简介设施
		toProfile () {
			this.$router.push({
				name: 'hotelprofiletools',
				replace: true
			})
		},
		//	酒店评论
		toComment () {
			this.$router.push({
				name: 'hotelcomment',
				replace: true
			})
		}
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
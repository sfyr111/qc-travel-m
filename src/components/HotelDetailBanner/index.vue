<template>
	<div class="hotel_detail_banner" @click="hotelPhoto">
		<img :src="baseInfo.imgUrl" alt="酒店图片">

		<div class="bottom clearfix">
			<span class="fl bsizing overfl-oneline">{{ baseInfo.name }}</span>
			<span class="fr bsizing">{{ pictures.length }}张</span>
		</div>
	</div>
</template>

<style lang="less">
.hotel_detail_banner{
	position: relative;
	font-size: .26rem;
	img {
		width: 100%;
		height: 3.8rem;
		display: block;
	}

	.bottom{
		width: 100%;
		height: .6rem;
		line-height: .6rem;
		position: absolute;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .5);
		color: #fff;
		font-size: .26rem;

		.fl{
			width: 6rem;
			padding: 0 .35rem;
		}

		.fr{
			width: 1.5rem;
			padding-right: .3rem;
			text-align: right;
		}
	}
}
</style>

<script>
export default {
	props: {
		pictures: {
			type: Array,
			default: []
		},
		baseInfo: {
			type: Object,
			default: {}
		}
	},
		methods: {
			//	跳转酒店图片
			hotelPhoto () {
				this.$emit('to-hotel-photo')
			}
		}
}
</script>
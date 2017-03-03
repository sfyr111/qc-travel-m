<template>
<div class="hotel_list">
	<ul>
		<li v-for="(item, index) in list" class="border-bottom border clearfix" @click="toDetail(item.hotelId)">
			<div class="left fl">
				<img :src="item.imgUrl" alt="酒店图片">
			</div>
			<div class="middle fl bsizing">
				<h2 class="overfl-oneline font28">
					{{ item.name }}
				</h2>
				<div class="comment overfl-oneline color_66">
					<em class="red_icon">{{ item.praiseDegree }}分</em>
					{{ item.commentNum }}条评论
				</div>
				<p class="overfl-oneline  color_66">
					{{ item.address }}
				</p>
			</div>
			<div class="right fl ver-middle red_icon">
				<em>¥</em>
				<i class="font32">{{ item.intMinPrice }}</i>
				<em class="color_66">起</em>
			</div>
		</li>
	</ul>
</div>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: []
		}
	},

	methods: {
		//	跳转酒店详情
		toDetail (hotelId) {
			this.$emit('to-hotel-detail', hotelId)
		}
	}
}
</script>

<style lang="less">
.hotel_list li{
	padding: .2rem 0 .2rem .2rem;

	.left {
		width: 2.1rem;
		height: 1.64rem;
		img {
			width: 2.12rem;
			height: 1.64rem;
		}
	}

	.middle {
		width: 3.55rem;
		height: 1.64rem;
		padding: .16rem .05rem .24rem .26rem;

		.comment{
			margin: .16rem 0;
		}
	}

	.right{
		width: 1.65rem;
		height: 1.64rem;

		em{
			position: relative;
			top: .03rem;
		}
	}
}
</style>
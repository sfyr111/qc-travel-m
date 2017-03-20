<template>
	<div class="hotel_photo">
		<ul class="clearfix">
			<li v-for="(item, index) in hotelDetail.pictures" class="bsizing previewer-demo-img" @click="show(index)">
				<img :src="hotelDetail.pictures[index].smallPic" alt="酒店图片">
			</li>
		</ul>
		<previewer :list="hotelDetail.pictures" ref="previewer" :options="options"></previewer>
	</div>
</template>

<style lang="less">
.hotel_photo {
	padding: .24rem .2rem .24rem .14rem;
	li {
		float: left;
		width: 50%;
		margin-bottom: .1rem;
		padding-left: .1rem;

		img {
			display: block;
		}
	}
}
</style>

<script>
import { Previewer } from 'vux'
export default {
	data () {
		return {
			hotelDetail: {},			//	酒店详情
			options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      }	
		}
	},
	created () {
		this.hotelDetail = JSON.parse(sessionStorage.getItem('hotelDetail'))
		this.hotelDetail.pictures.forEach(function (item) {
			item.w = 550
			item.h = 412
			item.src = item.bigPic
		})
	},
	components: {
	   Previewer
	 },
	 methods: {
	   show (index) {
	     this.$refs.previewer.show(index)
	   }
	 },
}
</script>
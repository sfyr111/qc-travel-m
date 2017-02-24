<template>
	<div class="list" @click="add">
		<h1>显示vuex数据</h1>
		<div>
			<ul>
				<li v-for="(item, index) in getHotelList.searchedHotelInfos">
					{{index + '--' + item.address }}
				</li>
			</ul>
		</div>
	</div>
</template>

<style>
.list li{
	line-height: .8rem;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	created () {
		let options = {
			errMsg: '出错了'
		}
		//this.hotelList(options)
	},
	methods: {
		...mapActions([
			'hotelList'
		]),
		add: function () {
			let options = {
				errMsg: '出错了'
			}
			this.hotelList(options)
		}
	},
	computed: {
		...mapGetters([
			'getHotelList'
		])
	}
}
</script>
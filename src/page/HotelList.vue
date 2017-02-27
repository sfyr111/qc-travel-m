<template>
	<div>
		<!-- 城市，酒店名 -->
		<hotel-list-head></hotel-list-head>

		<!-- 酒店列表 -->
		<hotel-list></hotel-list>
	</div>
</template>

<script>
import { HotelList, HotelListHead } from '../components'

export default {
	data () {
		return {}
	},

	components: {
		HotelList,
		HotelListHead
	}
}
</script>

<style lang="less">
	body{
		background: #fff;
	}
</style>
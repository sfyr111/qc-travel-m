<template>
	<div>
		<div class="nodata" :style="styleObj">{{str}}</div>
	</div>
</template>
<script>
	export default {
		props: {
			str: {
				type: String,
				default: '没有数据'
			},
			showNoData: {
				type: Boolean,
				default: false
			},
			styleObj: {
				type: Object,
			}
		}
	}
</script>
<style scoped>
	.nodata {
		width: 100%;
		height: 3.00rem;
		line-height: 3.00rem;
		font-size: .32rem;
		background-color: #eeeeee;
		text-align: center;
	}
</style>
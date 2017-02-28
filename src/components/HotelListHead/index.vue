<template>
	<div class="hotel_list_search clearfix bg_cc">
		<div class="left bsizing ver-middle fl" @click="showSelectCity">
			<em class="font28">{{ cityName }}</em>
			<i class="icon iconfont">&#xe615;</i>
		</div>
		<div class="right bsizing fl">
			<i class="icon iconfont">&#xe651;</i>
			<input type="text" placeholder="酒店名">
		</div>
	</div>
</template>

<style lang="less">
.hotel_list_search {
	padding: .25rem 0;

	.left {
		width: 1.3rem;
		height: .68rem;

		i {
			font-size: .24rem;
			position: relative;
			top: .02rem;
			left: .1rem;
		}
	}

	.right {
		width: 5.9rem;
		height: .68rem;
		padding-left: .25rem;
		position: relative;
		background: #fff;
		border-radius: .05rem;
		
		i {
			position: absolute;
			top: 50%;
			left: .25rem;
			-webkit-transform: translate3d(0, -50%, 0);
			transform: translate3d(0, -50%, 0);
		}

		input {
			width: 5.5rem;
			height: 100%;
			margin-left: .4rem;
		}
	}
}
</style>

<script>
export default {
	props: {
		cityName: {
			type: String,
			default: '北京'
		}
	},

	methods: {
		showSelectCity () {
			this.$emit('show-select-city')
		}
	}
}
</script>
<template>
	<div class="hotel_detail_item" @click="itemClick">
		<div class="hotel_detail_item_container clearfix ver-middle border-bottom-dashed border">
			<slot name="left"></slot>
			<slot name="right"></slot>
		</div>
	</div>
</template>

<style lang="less">
.hotel_detail_item{
	padding: 0 .25rem;
	background: #fff;
	.hotel_detail_item_container{
		height: .9rem;
		font-size: .26rem;
		div{
			float: left;
			width: 5.78rem;
			-webikit-box-sizing: border-box;
			box-sizing: border-box;
			padding: 0 .1rem;
			em:last-child{
				margin-left: .16rem;
			}
		}
		span {
			float: left;
			width: 1.15rem;
			text-align: right;
			color: #33a9fb;

			i {
				color: #666;
			}
		}
	}
}
.hotel_detail_item.border_none{
	.hotel_detail_item_container:before{
		display: none;
	}
}
</style>

<script>
export default {
	methods: {
		itemClick () {
			this.$emit('item-click')
		}
	}
}
</script>
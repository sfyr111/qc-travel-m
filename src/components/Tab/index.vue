<template>
	<div class="tab_container">
		<div class="border border-b">
			<button v-for="(item, index) in tabList" :style="{width: width}" :class="{'active': index === tabIndex}" @click="tabClick(index)">{{ item.name }}</button>
		</div>
	</div>
</template>

<style lang="less">
.tab_container{
	background: #fff;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 110;

	button{
		height: .88rem;
		font-size: .3rem;
	}

	button.active{
		color: #f23030;
		position: relative;
	}
	button.active:after{
		content: "";
		width: 100%;
		height: 2px;
		background: #f23030;
		position: absolute;
		bottom: 0;
		left: 0;
	}
}
</style>

<script>
export default {
	props: {
		tabList: {
			type: Array,
			default: ['请选择']
		},
		width: {
			type: String,
			default: '33.3333%'
		},
		tabIndex: {
			type: Number,
			default: 0
		}
	},

	data () {
		return {}
	},

	methods: {
		tabClick (index) {
			if (this.tabIndex === index) {
				return 
			}
			
			this.$emit('tab-click', index)
		}
	}
}
</script>
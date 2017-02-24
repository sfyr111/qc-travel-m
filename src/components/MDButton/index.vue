<template>
	<div>
		<button :style="font" @click="btnClick">{{ str }}</button>
	</div>
</template>

<script>
export default {
	props: {
		str: {
			type: String,
			default: '按钮'
		},
		font: {
			type: Object,
			default: {
				'width': '1rem',
				'height': '.6rem',
				'font-size': '.28rem',
				'color': '#fff',
				'background': '#ee3535'
			}
		}
	},
	methods: {
		btnClick: function () {
			this.$emit('btn-click')
		}
	}
}
</script>

<style>
body {
	background: #eee;
}
</style>
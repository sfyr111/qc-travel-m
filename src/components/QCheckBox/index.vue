<template>
	<div :class="{ 'checked' : isChecked }">
		<div class="checkbox" @click="troggleCheck()"></div>
	</div>
</template>
<style lang="less" scoped>
	.checkbox {
	    background-color: #f6f6f6;
	    border: 1px solid #bbbbbb;
	    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
	    padding: .18rem;
	    border-radius: 50%;
	    display: inline-block;
	    position: relative;
	}
	.checked > .checkbox {
	    background-color: #32abfb;
	    border: 1px solid #32abfb;
	    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05), inset 15px 10px -12px rgba(255, 255, 255, 0.1);
	    color: #243441;
	}
	.checked > .checkbox:after {
	    content: '\2714';
	    position: absolute;
	    top: -.08rem;
	    left: -.01rem;
	    color: #ffffff;
	    width: 100%;
	    text-align: center;
	    font-size: 1.4em;
	    padding: 1px 0 0 0;
	    vertical-align: text-top;
	}
</style>
<script>
	export default {
		props: {
			isChecked: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			troggleCheck () {
				this.$emit('troggle-check')
			}
		}
	}
</script>
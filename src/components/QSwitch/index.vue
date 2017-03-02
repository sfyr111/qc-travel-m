<template>
	<div class="switch_box">
		<button class="q-switch q-inited" :class="{ 'on' : isOn }" @click="switchOn()">
            <b class="q-switch-bg"></b><b class="q-switch-circle"></b>
        </button>
	</div>
</template>
<style lang="less" scoped>
	.switch_box {
		display: inline-block;
	}
	.q-switch {
		position: absolute;
	    top: 6px;
	    right: 15px;
		-webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	    width: .70rem;
    	height: .38rem;
	    -webkit-box-shadow: inset 0 0 1px 1px #c5c5c5;
	    -moz-box-shadow: inset 0 0 1px 1px #c5c5c5;
	    box-shadow: inset 0 0 1px 1px #c5c5c5;
	    -webkit-border-radius: 28px;
	    -moz-border-radius: 28px;
	    border-radius: 28px;
	    position: relative;
	    background-color: #bbbbbb;
	    .q-switch-bg {
	    	display: block;
		    top: 0;
		    left: 0;
		    right: 0;
		    bottom: 0;
		    position: absolute;
		    -webkit-box-shadow: inset 0 0 2px 2px rgba(0,0,0,0.05);
		    -moz-box-shadow: inset 0 0 2px 2px rgba(0,0,0,0.05);
		    box-shadow: inset 0 0 2px 2px rgba(0,0,0,0.05);
		    -webkit-transition: .2s ease-in-out;
		    -moz-transition: .2s ease-in-out;
		    -o-transition: .2s ease-in-out;
		    transition: .2s ease-in-out;
		    -webkit-border-radius: 28px;
		    -moz-border-radius: 28px;
		    border-radius: 28px;
	    }
	    .q-switch-circle {
	    	display: block;
		    top: .02rem;
		    left: .02rem;
		    bottom: .02rem;
		    right: .38rem;
		    -webkit-border-radius: 50%;
		    -moz-border-radius: 50%;
		    border-radius: 50%;
		    position: absolute;
		    background-color: #fff;
		    -webkit-box-shadow: 0 1px 2px 1px rgba(0,0,0,0.2);
		    -moz-box-shadow: 0 1px 2px 1px rgba(0,0,0,0.2);
		    box-shadow: 0 1px 2px 1px rgba(0,0,0,0.2);
		    -webkit-transition: .15s ease-in-out;
		    -moz-transition: .15s ease-in-out;
		    -o-transition: .15s ease-in-out;
		    transition: .15s ease-in-out;
		    -webkit-transition-property: left,right;
		    -moz-transition-property: left,right;
		    -o-transition-property: left,right;
		    transition-property: left,right;
		    -webkit-transition-delay: 0s,.04s;
		    -moz-transition-delay: 0s,.04s;
		    -o-transition-delay: 0s,.04s;
		    transition-delay: 0s,.04s;
	    }
	}
	.on {
		.q-switch-bg {
			-webkit-box-shadow: inset 0 0 2px 20px #33aafb;
		    -moz-box-shadow: inset 0 0 2px 20px #33aafb;
		    box-shadow: inset 0 0 2px 20px #33aafb;
		}
		.q-switch-circle {
			right: .02rem;
		    left: .34rem;
		    -webkit-transition: .15s ease-in-out;
		    -moz-transition: .15s ease-in-out;
		    -o-transition: .15s ease-in-out;
		    transition: .15s ease-in-out;
		    -webkit-transition-property: left,right;
		    -moz-transition-property: left,right;
		    -o-transition-property: left,right;
		    transition-property: left,right;
		    -webkit-transition-delay: .04s,0s;
		    -moz-transition-delay: .04s,0s;
		    -o-transition-delay: .04s,0s;
		    transition-delay: .04s,0s;
		}
	}
</style>
<script>
	export default {
		props: {
			isOn: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			switchOn () {
				this.$emit('q-switch')
			}
		}
	}
</script>
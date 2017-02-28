<template>
  <div>
    <div v-show="show" class="mask"></div>
    <div v-show="show" class="change_box">
		<div class="change_hd">退改签说明</div>
		<i class="icon iconfont icon-quxiao" @click="hideTip()"></i>
		<div class="change_cont">
			<div class="change_row change_turn">
				<h4>转签规定</h4>
				<span>{{ticketTurn}}</span>
			</div>
			<div class="change_row change_change">
				<h4>改签规定</h4>
				<span>{{ticketChange}}</span>
			</div>
			<div class="change_row change_return">
				<h4>退票规定</h4>
				<span>{{ticketBack}}</span>
			</div>
		</div>
    </div>
  </div>
</template>
<style scoped>
	.mask {
		display: block;
		position: fixed;
		top: 0px;
		left: 0px;
		background-color: #333333;
		opacity: 0.85;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: 9999;
	}
	.change_box {
		position: fixed;
		top: 50%;
		left: 50%;
		margin-left: -3.30rem;
		margin-top: -2.20rem;
		width: 6.00rem;
		padding: 0 .32rem .40rem;
		z-index: 9999;
	}	
	.change_hd {
		position: relative;
		height: .76rem;
		line-height: .76rem;
		font-size: .3rem;
		border-radius: 3px 3px 0 0;
		text-align: center;
		background-color: #c4e5fd;
	}
	.icon-quxiao {
		position: absolute;
		top: -.30rem;
    	right: .06rem;
    	color: #fff;
    	font-size: .4rem;
	}
	.change_cont {
		padding-top: .20rem;
		padding-right: .30rem;
		padding-left: .30rem;
		padding-bottom: .40rem;
		border-radius: 0 0 3px 3px;
		background-color: #fff;
	}
	.change_row {
		line-height: .46rem;
	}
	.change_cont h4 {
		color: #333333;
		font-size: .30rem;
	}
	.change_cont span {
		font-size: .28rem;
		color: #747474;
	}
</style>
<script>
	export default {
		props: {
			show: {
				type: Boolean
			},
			ticketTurn: {
	            type: String,
	            default: ''
	        },
	        ticketChange: {
	            type: String,
	            default: ''
	        },
	        ticketBack: {
	            type: String,
	            default: ''
	        }
		},
		methods: {
			hideTip () {
				this.$emit('hide-tip')
			}
		}
	}
</script>
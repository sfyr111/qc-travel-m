<template>
	<div>
		<div class="pass_box">
			<h3>乘客信息</h3>
			<div class="pass" v-for="(pass, index) in passChecked">
				<div class="pass_inf">
					<i class="icon iconfont icon-yuanquanjian" @click="removePass(index)"></i>
					<div class="inf" @click="updatePass(index)">
						<span class="name">{{pass.name}}</span>
						<span class="card">{{pass.certtypeStr}}&nbsp;&nbsp;{{pass.certId}}</span>
					</div>
					<i class="icon iconfont icon-gengduo" @click="updatePass(index)"></i>
				</div>			
				<div class="insurance clearfix">
					<span class="insurance_name">航空意外险</span>
					<i class="icon iconfont icon-wenhao"></i>
					<span class="insurance_inf">￥50/份<em>（最高赔付：50万/份）</em></span>
					<q-switch class="fr" :is-on="pass.checkIns" @q-switch="toggleSwitch(index)"></q-switch>
				</div>
			</div>
			<div class="pass_add" @click="checkPassenager()">
				<i class="icon iconfont icon-addcircle"></i>
				<span>添加乘机人</span>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.pass_box {
		margin-top: .20rem;
		padding: .20rem .20rem 0;
		background-color: #ffffff;
		h3 {
			padding-left: .10rem;
			font-size: .32rem;
			line-height: .60rem;
			border-bottom: 1px solid #bfbfbf;
		}
		.pass {
			padding: 0 .10rem;
			.pass_inf {
				display: flex;
				height: 1.00rem;
				border-bottom: 1px dashed #bfbfbf;
				.icon-yuanquanjian {
					line-height: 1.00rem;
					flex: 1.2;
					color: #ee3535;
				}
				.icon-gengduo {
					line-height: 1.00rem;
					flex: 1;
				}
				.inf {
					line-height: .50rem;
					flex: 18;
					.name {
						margin-top: .04rem;
						margin-bottom: -.08rem;
						font-size: .26rem;
						display: block;
					}
					.card {
						display: block;
					}
				}
			}
			.insurance {
				line-height: 1.0rem;
				border-bottom: 1px dashed #bfbfbf;
				.insurance_name {
					font-size: .28rem;
				}
				.icon-wenhao {
					color: #33aafb;
				}
				span {
					em {
						color: #666666;
					}
				}
				.weui-cell:before {
					display: none;
				}
				.weui-cell__bd {
					display: none!important;
				}
			}
		}		
		.pass_add {
			line-height: .80rem;
			i {
				color: #ee3535;
			}
			span {
				font-size: .28rem;
			}
		}
	}
</style>
<script>
	import QSwitch from '../QSwitch'
	export default {
		components: {
			QSwitch
		},
		data () {
			return {
				on: false,
				passChecked: JSON.parse(sessionStorage.getItem('passenagerChecked'))
			}
		},
		methods: {
			toggleSwitch (index) {
				this.passChecked[index].checkIns = !this.passChecked[index].checkIns
				sessionStorage.removeItem('passenagerChecked')
				sessionStorage.setItem('passenagerChecked', JSON.stringify(this.passChecked))
			},
			checkPassenager (index) {
				this.$emit('check-passenager')
			},
			updatePass (index) {
				sessionStorage.removeItem('passenager')
				sessionStorage.setItem('passenager', JSON.stringify(this.passChecked[index]))
				this.$router.push({
		 			name: 'passenagerModel',
					query: {
		 		 	}
				})
			},
			removePass (index) {
				this.passChecked.splice(index, 1)
				sessionStorage.removeItem('passenagerChecked')
				sessionStorage.setItem('passenagerChecked', JSON.stringify(this.passChecked))
			}
		}
	}
</script>
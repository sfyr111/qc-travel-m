<template>
	<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
		<div>
			<div class="p_box">
				<table>
					<tr v-for="(pass, index) in passList">
						<td><i class="icon iconfont icon-qianbi" @click="updatePass(index)"></i></td>
						<td>
							<span class="p_info">{{pass.name}}&nbsp;&nbsp;{{pass.phoneNum}}</span>
							<span class="p_no">{{pass.certId}}</span>
						</td>
						<td>
							<q-check-box @troggle-check="checkedPass(index)" :is-checked="pass.isCheck"></q-check-box>
						</td>
					</tr>
				</table>
			</div>
			<m-d-button :font="style" :str="str" @btn-click="addPass"></m-d-button>
		</div>
	</transition>
</template>
<style lang="less" scoped>
	.p_box {
		background-color: #ffffff;
		margin: .20rem;
		padding: 0 .30rem;
		border-radius: .04rem;
		table {
			width: 100%;			
			td {
				height: 1.36rem;
				border-bottom: 1px dashed #bbbbbb;
				i {
					padding: 0 .16rem;
    				font-size: .60rem;
					color: #f6a300;
				}
				.p_info {
					display: block;
					font-size: .32rem;
				}
				.p_no {
					display: block;
					font-size: .28rem;
					color: #666666;
					padding-top: .10rem;
				}
			}
			tr:last-child {
				td {
					border-bottom: none;
				}
			}
		}
	}
</style>
<script>
	import configUrl from '../../data/configUrl'
	import { QCheckBox, MDButton, showTips } from '../../components'
	import { mapGetters } from 'vuex'
	export default {
		components: {
			QCheckBox,
			MDButton
		},
		computed: {
			...mapGetters({
		        passList: 'getPassList'
		    }),
		},
		created () {
			// 初始化乘客列表
			this.initPassenagers()
		},
		data () {
			return {				
				style: {
					'padding': '0 2.56rem',
					height: '.8rem',
					'font-size': '.32rem',
					'color': '#ffffff',
					background: '#ee3535',
					'margin': '.5rem auto .5rem auto',
					display: 'block',
					'border-radius': '.1rem'
				},									//	按钮样式
				str: '添加乘客',		//	按钮内容
			}
		},
		methods: {
			initPassenagers () {				
				let opt = {
					url: configUrl.passQuery.dataUrl,
			        data: '',
			        type: 'post',
				}
				this.$store.dispatch('passList', opt).then(function (resp) {
		        }).catch(function(resp){
		          showTips(resp.msg, 2000)
		        })
			},
			checkedPass (index) {
				sessionStorage.removeItem('passenagerChecked')		
				this.passList[index].isCheck = !this.passList[index].isCheck
				let passenagerChecked = []
				this.passList.map(function (item) {
					if (item.isCheck) {
						passenagerChecked.push(item)
					}
				})
				let passSet = new Set(passenagerChecked)
				sessionStorage.setItem('passenagerChecked', JSON.stringify(passSet))
			},
			// 维护乘客
			updatePass (index) {
				sessionStorage.removeItem('passenager')
				sessionStorage.setItem('passenager', JSON.stringify(this.passList[index]))
				this.$router.push({
		 			name: 'passenagerModel',
					query: {
		 		 	}
				})
			},
			addPass () {
				this.$router.push({
		 			name: 'passenagerModel',
					query: {
		 		 	}
				})
			}
		}
	}
</script>
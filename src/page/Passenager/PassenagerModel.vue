<template>
	<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
		<div class="m_box">
			<div class="m_row">
				<span>旅客类型</span>
				<div class="m_r">
					<select v-model="passenager.psgtype">
						<option v-for="type in psgtypes" :value="type.value">{{type.text}}</option>
					</select>
					<i class="icon iconfont icon-xiangyoujiantou"></i>
				</div>
			</div>
			<div class="m_row">
				<span>姓名</span>
				<div class="m_r">
					<input type="text" placeholder="输入姓名" v-model="passenager.name">
				</div>
			</div>
			<div class="m_row">
				<span>性别</span>
				<div class="m_r">
					<select v-model="passenager.psgsex">
						<option v-for="sex in psgsexs" :value="sex.value">{{sex.text}}</option>
					</select>
					<i class="icon iconfont icon-xiangyoujiantou"></i>
				</div>
			</div>
			<div class="m_row">
				<span>电话</span>
				<div class="m_r">
					<input type="tel" placeholder="输入电话" v-model="passenager.phoneNum">
				</div>
			</div>
			<div class="m_row">
				<span>证件类型</span>
				<div class="m_r">
					<select v-model="passenager.certtype">
						<option v-for="cert in certtypes" :value="cert.value">{{cert.text}}</option>
					</select>
					<i class="icon iconfont icon-xiangyoujiantou"></i>
				</div>
			</div>
			<div class="m_row">
				<span>证件号码</span>
				<div class="m_r">
					<input type="text" placeholder="输入证件号码" v-model="passenager.certId">
				</div>
			</div>
			<div class="m_row">
				<span>生日</span>
				<div class="m_r">
					<input type="text" placeholder="输入生日" v-model="passenager.birthday">
				</div>
			</div>
			<div class="btn_group">
				<button class="cannel" @click="cannel()">取消</button>
				<button class="save" @click="save()">保存</button>
			</div>		
		</div>
	</transition>
</template>
<style lang="less" scoped>
	.m_box {
		margin: .20rem;
		padding: 0 .30rem;
		border-radius: .06rem;
		background-color: #ffffff;
		font-size: .28rem;
		.m_row {			
			display: flex;
			line-height: .90rem;
			border-bottom: 1px solid #bbbbbb;
			span {
				flex: 1;
			}
			.m_r {
				flex: 3;
				input {
					width: 100%;
					height: 100%;
				}
				select {
					width: 90%;
					height: 100%;
				}
			}
		}
		.btn_group {
			line-height: 1.60rem;
    		text-align: center;
    		button {
    			font-size: .28rem;
    			border-radius: .06rem;
    			padding: .20rem 1.12rem;
    		}
    		.cannel {
    			border: 1px solid #ee3535;
    			background-color: #ffffff;
    			color: #ee3535;
    		}
    		.save {
    			border: 1px solid #ee3535;
    			background-color: #ee3535;
    			color: #ffffff;
    		}
		}
	}
</style>
<script>
	import configUrl from '../../data/configUrl'
	import showTips from '../../components'
	export default {
		components: {
			showTips
		},
		created () {
			this.passenagerInit()
		},
		data () {
			return {
				passenager: {
					id: '',
	            	name: '',
	            	certtype: 'IDC',
	            	psgtype: 'ADT',
	            	certId: '',
	            	phoneNum: '',
	            	psgsex: '',
	            	email: '',
	            	birthday: ''
				},
				certtypes: [
					{
						value: "IDC",
						text: "身份证"
					},
					{
						value: "PSP",
						text: "护照"
					},
					{
						value: "HKM",
						text: "港澳通行证"
					},
					{
						value: "MOC",
						text: "军官证"
					},
					{
						value: "TW1",
						text: "回乡证"
					},
					{
						value: "TW2",
						text: "台胞证"
					},
					{
						value: "SEA",
						text: "国际海员证"
					},
					{
						value: "OTHER",
						text: "其他"
					}
				],
				psgtypes: [
					{
						value: 'ADT',
						text: '成人'
					},{
						value: 'CHD',
						text: '儿童'
					},
				],
				psgsexs: [
					{
						value: "M",
						text: "男"
					},
					{
						value: "F",
						text: "女"
					}
				]
			}			
		},
		methods: {
			passenagerInit () {
				if (sessionStorage.getItem('passenager')) {
	    			this.passenager = JSON.parse(sessionStorage.getItem('passenager'))
	    		}
			},
			cannel () {
				this.$router.go(-1)
			},
			save () {
				let _this = this
				let opt = {
					url: configUrl.passSave.dataUrl,
					type: 'post',
					data: this.passenager
				}
				this.$store.dispatch('passSave', opt).then(function (resp) {
					let passSave = JSON.parse(sessionStorage.getItem('passenagerChecked'))
					let passChecked = []
					if (passSave && passSave.length>0) {	
						passSave.map(function (item) {
							if (item.id == _this.passenager.id) {
								item=_this.passenager
							}
							passChecked.push(item)
						})
						sessionStorage.setItem('passenagerChecked', JSON.stringify(passChecked))
					}					
					_this.$router.go(-1)
				}).catch(function (resp) {
					console.log(resp)
				})
			}
		}
	}
</script>
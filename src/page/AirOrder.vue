<template>
	<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
		<div>
			<!-- 机票信息 -->
			<air-order-trip 
				:trip-list="trips"
				@show-tip="showTipData"></air-order-trip>
			<!-- 乘客信息 -->
			<air-order-passenager @check-passenager="goPassenager"></air-order-passenager>

			<!-- 联系人信息 -->
			<div class="contact_box">
				<h3>联系人信息</h3>
				<div class="contact">
					<div class="input" >
						<input type="text" placeholder="姓名" v-model="linkmanName">					
					</div>
					<div class="input">					
						<input type="tel" placeholder="手机号码" v-model="linkmanMobile">
					</div>
					<div class="input">					
						<input type="email" placeholder="邮箱" v-model="linkmanEmail">
					</div>
				</div>
			</div>
			<!-- 发票信息 -->
			<div class="invoice_box">
				<div class="invoice_hd">				
					<h3 class="">报销凭证</h3>
					<select :value="deliverytype">
						<option :value="deliverytype.value" v-for="deliverytype in deliverytypes">{{deliverytype.text}}</option>
					</select>
					<i class="icon iconfont icon-xiangyoujiantou"></i>
				</div>
				<table class="invoice_address" v-if="addressList.length>0">
					<tr v-for="(addr, index) in addressList" @click="checkAddress(index)">
						<td>
							<span>{{addr.recipientsName}}&nbsp;{{addr.phone}}</span>
							<div>{{addr.provinceName}}{{addr.cityName}}{{addr.areaName}}{{addr.address}}{{addr.postCode}}</div>
						</td>
						<td>
							<i class="icon iconfont icon-zhengque" v-show="addressIndex==index"></i>
						</td>
					</tr>
				</table>			
				<div class="address_add" v-if="addressList.length==0" @click="addAddress()">
					<i class="icon iconfont icon-addcircle"></i>
					<span>添加邮寄地址</span>
				</div>
			</div>
			<!-- 费用计算 -->
			<div class="sub_box">
				<span class="sub_price">应付金额：<em>￥750</em></span>
				<span class="sub_detail">费用明细</span>
				<span class="sub_btn">提交订单</span>
			</div>

			<tip-change 
		      :show="showTip" 
		      :ticket-turn="ticketTurn"
		      :ticket-change="ticketChange"
		      :ticket-back="ticketBack"
		      @hide-tip="hideTip"></tip-change>
		</div>
	</transition>
</template>
<script>
	import http from '../api/http'
	import configUrl from '../data/configUrl'
	import { AirOrderTrip, AirOrderPassenager, TipChange } from '../components'
	import { mapGetters } from 'vuex'
	export default {
		components: {
			AirOrderTrip,
			AirOrderPassenager,
			TipChange
		},
		computed: {
			...mapGetters({
				addressList: 'getAddressList'
			}),
			trips () {
				return JSON.parse(sessionStorage.getItem('model'))
			},
			// 是否需要行程单
			deliveryNeedinvoice () {
				if (this.deliverytype && this.deliverytype === 'NOD') {
					return false
				}
				if (this.deliverytype && this.deliverytype != 'NOD') {
					return true
				}
			}
		},
		created () {
			this.initAddress()
		},
		data () {
			return {
				showTip: false,
				ticketTurn: '',
				ticketChange: '',
				ticketBack: '',			
				deliverytype: 'NOD',		// 邮寄方式
				deliverytypes: [
					{
						value: 'NOD',
						text: '不需要报销凭证'
					}, {
						value: 'FRP',
						text: '免费邮寄（预计起飞后7-14个工作日到达）'
					}, {
						value: 'EMS',
						text: '快递到付（预计起飞后2-3个工作日到达）'
					},
				],
				linkmanName: '',		// 联系人信息
				linkmanMobile: '',		// 联系人信息
				linkmanEmail: '',		// 联系人信息
				addressIndex: 0,		// 邮寄地址
			}
		},
		methods: {
			// 新增地址
			addAddress () {

			},
			// 选择邮寄地址
			checkAddress (index) {
				this.addressIndex = index
			},
			// 初始化地址
			initAddress () {
				let opt = {
					url: configUrl.addressList.dataUrl,
					type: 'get'
				}
				this.$store.dispatch('addressList', opt).then(function(resp) {
				})
			},
			hideTip () {
				this.showTip = false
			},
			// 查询退改签
			showTipData (sourceId, airways, depCityCode, arrCityCode, depdate, fareitemid, seatcode) {
				let _this = this
		        let data = {
		          sourceId: sourceId,
		          airways: airways,
		          depCity: depCityCode,
		          arrCity: arrCityCode,
		          beginDate: depdate,
		          fareItemId: fareitemid,
		          classNO: seatcode
		        }
		        new Promise(function ( resolve, reject ) {
		          http.fetch(configUrl.airChange.dataUrl, {
		            loading: true,
		            data: data,
		            type: 'post',
		          })
		          .then(res => {
		            if (res.body.success) {
		              _this.ticketTurn = res.body.result.ticketTurn
		              _this.ticketChange = res.body.result.ticketChange
		              _this.ticketBack = res.body.result.ticketBack
		              _this.showTip = true
		              resolve(res.body)
		            }
		            if (!res.body.success) {
		              reject(res.body)
		            }
		          })
		        });
			},
			// 添加乘客
			goPassenager () {
				this.$router.push({
		 			name: 'passenagerList',
					query: {
		 		 	}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.contact_box {
		margin-top: .20rem;
		padding: .20rem .20rem 0;
		background-color: #ffffff;
		h3 {
			padding-left: .10rem;
			font-size: .32rem;
			line-height: .60rem;
			border-bottom: 1px solid #bfbfbf;
		}
		.contact {
			padding: 0 .10rem;
			.input {
				display: block;
				width: 100%;
				line-height: 1.00rem;
				border-bottom: 1px dashed #bfbfbf;
				input {
					height: 1.00rem;
    				width: 100%;
				}
			}
			.input:last-child {
				border: none;
			}
		}
	}
	.invoice_box {
		margin-top: .20rem;
		margin-bottom: 1.20rem;
		padding: .20rem .20rem 0;
		background-color: #ffffff;
		.invoice_hd {
			display: flex;
			padding-left: .10rem;			
			line-height: .60rem;
			border-bottom: 1px solid #bfbfbf;
			h3 {				
				flex: 1.5;
				font-size: .32rem;
			}
			select {
				direction: rtl;
				flex: 4;
				margin-bottom: .02rem;
				option {
					font-size: .20rem;
				}
			}
			i {
				text-align: right;
				flex: .2;
			}
		}
		.invoice_address {
			width: 100%;
			padding-left: .10rem;
			td {
				padding: .10rem 0;
				i {
					color: #ee3535;
				}
			}
		}		
		.address_add {
			line-height: .80rem;
			i {
				color: #ee3535;
			}
			span {
				font-size: .28rem;
			}
		}
	}
	.sub_box {
		position: fixed;
		display: flex;
		bottom: 0;
		height: 1.00rem;
		line-height: 1.00rem;
		width: 100%;
		background-color: #ffffff;
		.sub_price {
			flex: 2;
			font-size: .28rem;
			padding: 0 .32rem;
			em {
				color: #ee3535;
			}
		}
		.sub_detail {
			flex: 1;
			text-align: center;
		}
		.sub_btn {
			text-align: center;
			flex: 1;
			font-size: .28rem;
			background-color: #ee3535;
			color: #fff;
		}
	}
</style>
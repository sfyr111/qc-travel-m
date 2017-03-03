<template>
	<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
		<div>
			<!-- 机票信息 -->
			<air-order-trip 
				:trip-list="trips"
				@show-tip="showTipData"></air-order-trip>
			<!-- 乘客信息 -->
			<air-order-passenager @check-passenager="goPassenager" @toggle-switch="passChange"></air-order-passenager>

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
					<select v-model="deliverytype">
						<option :value="deliverytype.value" v-for="deliverytype in deliverytypes">{{deliverytype.text}}</option>
					</select>
					<i class="icon iconfont icon-xiangyoujiantou"></i>
				</div>
				<table class="invoice_address" v-show="deliverytype != 'NOD' && addressList.length>0">
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
				<div class="address_add" v-show="deliverytype != 'NOD' && addressList.length==0" @click="addAddress()">
					<i class="icon iconfont icon-addcircle"></i>
					<span>添加邮寄地址</span>
				</div>
			</div>
			<!-- 费用计算 -->
			<div class="sub_box">
				<span class="sub_price">应付金额：<em>￥{{total}}</em></span>
				<span v-show="!showPriceTip" class="sub_detail" @click="showPriceTips()">费用明细</span>
				<span v-show="!btnUse" class="sub_btn" @click="orderSubmit()">提交订单</span>
				<span v-show="btnUse" class="sub_btn">努力加载中</span>

				<ul v-show="showPriceTip" class="price_tip">
					<li v-show="manCount>0">
						<span class="p_name">成人票</span>
						<em>￥{{airPrice}}&nbsp;×{{manCount}}</em>
					</li>
					<li v-show="childCount>0">
						<span class="p_name">儿童票</span>
						<em>￥{{airChildPrice}}&nbsp;×{{childCount}}</em>
					</li>
					<li>
						<span class="p_name">基建/燃油费</span>
						<em>￥{{buildfee}}&nbsp;×{{buildfeeCount}}</em>
					</li>
					<li>
						<span class="p_name">保险</span>
						<em>￥20&nbsp;×{{checkInsNum}}</em>
					</li>
					<li>
						<span class="p_name">服务费</span>
						<em>￥{{servFee}}&nbsp;</em>
					</li>
				</ul>
			</div>
			<div v-show="showPriceTip" class="price_box" @click="hidePriceTips()"></div>
					
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
	import { AirOrderTrip, AirOrderPassenager, TipChange, showTips } from '../components'
	import { mapGetters } from 'vuex'
	export default {
		components: {
			AirOrderTrip,
			AirOrderPassenager,
			TipChange,
			showTips
		},
		computed: {
			...mapGetters({
				addressList: 'getAddressList'
			}),
			trips () {
				return JSON.parse(sessionStorage.getItem('model')) || []
			},
			// 是否需要行程单
			deliveryNeedinvoice () {
				if (this.deliverytype && this.deliverytype === 'NOD') {
					return false
				}
				if (this.deliverytype && this.deliverytype != 'NOD') {
					return true
				}
			},
			// 保险发票
			deliveryInsurInvoice () {
				if (this.deliverytype && this.deliverytype === 'NOD') {
					return false
				}
				if (this.deliverytype && this.deliverytype != 'NOD') {
					return true
				}
			},
			// 机票价
			airPrice () {
				return this.trips[0].price
			},
			// 儿童票价
			airChildPrice () {
				return this.trips[0].childSalePrice
			},
			// 乘客中成人数
			manCount () {
				let manNum = 0
				this.passengers.map(function (item) {
					if (item.psgtype == 'ADT') {
						manNum+=1
					}
				})
				return manNum
			},
			childCount () {
				let childNum = 0
				this.passengers.map(function (item) {
					if (item.psgtype == 'CHD') {
						childNum+=1
					}
				})
				return childNum
			},
			// 基建费份数
			buildfeeCount () {
				let manNum = 0
				this.passengers.map(function (item) {
					if (item.psgtype == 'ADT') {
						manNum+=1
					}
				})
				return manNum
			},
			// 基建费
			buildfee () {
				return (this.trips[0].buildfee+this.trips[0].oiltax).toString()
			},
			// 保险
			checkInsNum () {
				let checkInsNum = 0
				this.passengers.map(function (item) {
					if (item.checkIns) {
						checkInsNum+=1
					}
				})
				return checkInsNum
			},
			// 服务费
			servFee () {
				return 0
			},
			// 邮寄地址
			address () {
				let index = this.addressIndex
				return this.addressList[index]
			}																
		},
		created () {
			this.initAddress()
			// 计算价格
			this.calcTotal()
		},
		data () {
			return {
				showTip: false,
				ticketTurn: '',
				ticketChange: '',
				ticketBack: '',			
				deliverytype: 'FRP',		// 邮寄方式
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
				linkmanName: '',															// 联系人信息
				linkmanMobile: '',															// 联系人信息
				linkmanEmail: '',															// 联系人信息
				addressIndex: 0,															// 邮寄地址
				showPriceTip: false,														// 价格tip
				passengers: JSON.parse(sessionStorage.getItem('passenagerChecked')) || [],
				total: 0,																	// 机票总价
				btnUse: false
			}
		},
		methods: {
			// 提交订单
			orderSubmit () {
				if (this.btnUse) {
					showTips('请勿重复提交')
					return
				}
				if (!this.passengers || this.passengers.length==0) {
					showTips('请选择乘客！')
					return
				}
				if (!this.linkmanName) {
					showTips('请填写联系人姓名')
					return
				}
				if (!this.linkmanMobile) {
					showTips('请填写联系人电话')
					return
				}
				let _this = this
				var trip = JSON.parse(sessionStorage.getItem('model'))
      			var passenger = this.passengers
				// 提交的数据
				let data = {
					passenger,
			        trip,
			        deliveryDistrict: this.address.areaName || '',
			        reimburseTitle: this.address.invoiceTitle || '',
			        deliveryName: this.address.recipientsName || '',
			        deliveryDeliverytype: this.deliverytype,
			        deliveryCity: this.address.cityName || '',
			        linkmanFax: "",
			        sourceId: this.$route.query.sourceId || "",
			        linkmanTele: "",
			        deliveryNeedinvoice: this.deliveryNeedinvoice,
			        deliveryProvince: this.address.provinceName || '',
			        deliveryTele: "",
			        deliveryEmail: "",
			        deliveryInsurInvoice: this.deliveryInsurInvoice,
			        linkmanMobile: this.linkmanMobile,
			        deliveryAddress: this.address.address || '',
			        linkmanName: this.linkmanName,
			        orderBeanOrderPrice: this.total,
			        deliveryPostcode: "", // 邮编
			        thirdOrder: "",
			        token: "",
			        paymentType: "4",
			        linkmanEmail: this.linkmanEmail,
			        deliveryMobile: this.address.phone || '',
			        deliveryPostcode: this.address.postCode || '',
				}
				let options = {
					url: configUrl.airBook.dataUrl,
					type: 'post',
					data: JSON.stringify(data),
					contentType: 'application/json; charset=utf-8'
				}
				this.btnUse = true
				this.$store.dispatch('airBook', options).then(function (resp) {
					console.log(resp)
					_this.btnUse = fasle
				}).catch(function (resp) {
					showTips(resp.msg)
					_this.btnUse = fasle
				})
			},
			// 新增地址
			addAddress () {
				console.log('Address')
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
			},
			// 更新乘客数据
			passChange () {
				let list = JSON.parse(sessionStorage.getItem('passenagerChecked'))
				this.passengers = list
				this.calcTotal()
			},
			// 打开价格tip
			showPriceTips () {
				this.showPriceTip=true
			},
			// 关闭价格tip
			hidePriceTips () {
				this.showPriceTip=false
			},
			// 计算总价格
			calcTotal () {
		      // 计算总金额
		      this.total = 0
		      for (var i=0;i<this.trips.length; i++) {
		        var trip = this.trips[i]
		        for(var j=0; j<this.passengers.length;j++){
		          var passenger = this.passengers[j]
		          if(passenger.psgtype == 'ADT'){
		            passenger.price = parseInt(trip.price||0)+parseInt(trip.buildfee||0)+parseInt(trip.oiltax||0)+20*(passenger.checkIns?1:0)
		          }
		          if(passenger.psgtype == 'CHD') {
		            passenger.price = parseInt(trip.childSalePrice||0)+parseInt(trip.childOilTax||0)+20*(passenger.checkIns?1:0)
		          }
		          this.total += passenger.price
		        }
		        this.passengers = this.passengers.concat([])    
		      }
		    },
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
		z-index: 9;
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
		.price_tip {
			position: absolute;
			bottom: 1.00rem;
			background-color: #fff;
			width: 100%;
			li {
				padding: 0 .32rem;
				display: flex;
				line-height: .70rem;
				font-size: .28rem;
				span {
					flex: 4;
					text-align: left;
				}
				em {
					flex: 1;
					text-align: left;
					color: #ee3535;
				}
			}
		}
	}
	.price_box {
		background-color: #333333;
		position: fixed;
		top: 0;
		bottom: 0;
		opacity: .75;
		width: 100%;
		height: 100%;
	}
</style>
<template>
	<div>
		<div class="addr_box">
			<div class="addr_row">
				<span>发票抬头</span>
				<div class="addr_r">
					<input type="text" v-model="invoiceTitle">
				</div>
			</div>
			<div class="addr_row">
				<span>收件人</span>
				<div class="addr_r">
					<input type="text" v-model="recipientsName">
				</div>
			</div>
			<div class="addr_row">
				<span>所在地区</span>
				<div class="addr_r">
					<group label-width="4em" label-align="left">
				      	<x-address 
				      		:title="title2" 
				      		v-model="value2" 
				      		raw-value 
				      		:list="addressData" 
				      		value-text-align="right"></x-address>
				    </group>
				</div>
			</div>
			<div class="addr_row">
				<span>地址</span>
				<div class="addr_r">
					<input type="text" v-model="address">
				</div>
			</div>
			<div class="addr_row">
				<span>联系手机</span>
				<div class="addr_r">
					<input type="text" v-model="phone">
				</div>
			</div>
		</div>

		<M-D-Button :font="style" :str="str" @btn-click="btnClick"></M-D-Button>
	</div>
</template>
<style lang="less" scoped>
	.addr_box {
		margin: .20rem;
		padding: 0 .30rem;
		border-radius: .06rem;
		background-color: #ffffff;
		font-size: .28rem;
		.addr_row {			
			display: flex;
			line-height: .90rem;
			border-bottom: 1px solid #bbbbbb;
			&:last-child {
				border-bottom: none;
			}
			span {
				flex: 1;
				color: #676767;
			}
			.addr_r {
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
	}
</style>
<script>
	import { Group, XAddress, ChinaAddressData } from 'vux'
	import { MDButton } from '../../components'
	export default {
		components: {
			Group, 
			XAddress,
			MDButton
		},
		data () {
			return {				
				style: {
					'padding': '0 3.00rem',
					height: '.8rem',
					'font-size': '.32rem',
					'color': '#ffffff',
					background: '#ee3535',
					'margin': '.5rem auto .5rem auto',
					display: 'block',
					'border-radius': '.1rem'
				},									//	按钮样式
				str: '保存',		//	按钮内容
				invoiceTitle: '',
                recipientsName: '',
                phone: '',
                postCode: '',
                address: '',         
                invoiceId: '',       
                province: {},
                city: {},
                area: {},
                title2: '',
                addressData: ChinaAddressData,
                value2: ['广东省', '深圳市', '南山区'],
			}
		},
		methods: {
			btnClick () {
				console.log('提交')
			}
		}
	}
</script>
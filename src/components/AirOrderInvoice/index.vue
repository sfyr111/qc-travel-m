<template>
	<div>
		<div class="invoice_box">
			<div class="invoice_hd clearfix">				
				<h3 class="fl">报销凭证</h3>
				<select class="fr" name="" id="" value="1">
					<option value="1">免费邮寄</option>
				</select>
			</div>
			<div class="invoice_address">
				<div class="invoice_user">
					<span class="user_name">韩梅梅</span>
					<span class="user_phone">13666666666</span>
				</div>
				<div class="invoice_text">
					xxxxxxxxxxxxxxxxxx
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.invoice_box {
		margin-top: .20rem;
		margin-bottom: 1.20rem;
		padding: .20rem .20rem 0;
		background-color: #ffffff;
		.invoice_hd {
			padding-left: .10rem;			
			line-height: .60rem;
			border-bottom: 1px solid #bfbfbf;
			h3 {				
				font-size: .32rem;
			}
		}
		.invoice_address {
			padding-left: .10rem;		
			.invoice_user {
				margin-top: .10rem;
				.user_name {
					font-size: .28rem;
				}
			}
			.invoice_text {
				padding-bottom: .20rem;
			}
		}
	}
</style>
<template>
	<div>
		<div class="contact_box">
			<h3>联系人信息</h3>
			<div class="contact">
				<div class="input" >
					<input type="text" placeholder="姓名">					
				</div>
				<div class="input">					
					<input type="text" placeholder="手机号码">
				</div>
			</div>
		</div>
	</div>
</template>
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
</style>
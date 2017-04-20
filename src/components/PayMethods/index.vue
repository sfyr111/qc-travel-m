<template>
	<div class="pay_methods border-t border bg_ff">
		<ul>
			<li class="border-b border ver-center">
				选择支付方式
			</li>
			<li class="border-b border ver-center">
				<div class="left">
					白条
					<em class="color_99">可用额度：5600</em>
					<em class="color_bb none">余额不足</em>
				</div>
				<i class="icon iconfont color_blue">&#xe62b;</i>
				<!-- <i class="icon iconfont default">&#xe61a;</i> -->
				<span class="disabled none"></span>
				<span class="none"></span>
			</li>
			<li class="border-b border ver-center">
				<div class="left">
					余额
					<em class="color_99 none">可用额度</em>
					<em class="color_bb">余额不足</em>
				</div>
				<i class="icon iconfont color_blue none">&#xe62b;</i>
				<!-- <i class="icon iconfont default">&#xe61a;</i> -->
				<span class="disabled"></span>
				<span class="none"></span>
			</li>

			<li class="border-b border ver-center">
				<div class="left">
					<img src="../../assets/wx.svg">
					微信支付
				</div>
				<i class="icon iconfont color_blue none">&#xe62b;</i>
				<!-- <i class="icon iconfont default">&#xe61a;</i> -->
				<span class="disabled none"></span>
				<span></span>
			</li>

			<li class="border-b border ver-center">
				<div class="left">
					<img src="../../assets/zfb.svg">
					支付宝支付
				</div>
				<i class="icon iconfont color_blue none">&#xe62b;</i>
				<!-- <i class="icon iconfont default">&#xe61a;</i> -->
				<span class="disabled none"></span>
				<span></span>
			</li>
		</ul>
	</div>
</template>

<style lang="less">
.pay_methods {
	margin-top: .2rem;
	li {
		padding: 0 .3rem;
		height: .9rem;
		font-size: .28rem;
		
		.left{
			width: 6.4rem;
			display: inline-block;

			img {
				display: inline-block;
				width: .48rem;
				height: .4rem;
				vertical-align: middle;
				margin-right: .2rem;
			}

			em {
				margin-left: .2rem;
			}
		}

		i.color_blue{
			font-size: .36rem;
		}

		span{
			display: inline-block;
			width: .3rem;
			height: .3rem;
			border: 1px solid #ddd;
			border-radius: 100%;
			background: #fff;
		}
		span.disabled{
			background: #ecebeb;
		}

		span.none{
			display: none;
		}
	}
}
</style>
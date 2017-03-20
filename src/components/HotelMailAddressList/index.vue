<template>
	<div class="hotel_mail_address_list none">
		<ul>
			<li v-for="$index in 8" class="bg_ff">
				<div class="border" :class="[$index === 1 ? 'border-t' : 'border-top']">
					<h2 class="font28">
						广东&nbsp;深圳&nbsp;南山&nbsp;&nbsp;13445677654
					</h2>
					<p class="font26 color_66">
						东发上来会计法撒谎发撒旦&nbsp;1007-08
					</p>
					<i class="icon iconfont checked none">&#xe62b;</i>
					<i class="icon iconfont empty">&#xe61a;</i>
				</div>
			</li>
		</ul>
	</div>
</template>

<style lang="less">
.hotel_mail_address_list li{
	padding: 0 .48rem;

	div {
		padding: .2rem .2rem .2rem .55rem;

		h2 {
			margin-bottom: .2rem;
		}

		i {
			position: absolute;
			top: 50%;
			left: 0;
			-webkit-transform: translate3d(0, -50%, 0);
			transform: translate3d(0, -50%, 0);
			font-size: .36rem;
		}

		i.checked {
			color: #32abfb;
		}
		i.empty{
			color: #e6e6e6;
		}
	}
}

.hotel_mail_address_list li:last-child{
	margin-bottom: .2rem;
}
</style>
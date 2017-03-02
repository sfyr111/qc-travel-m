<template>
	<transition name="slide">
		<div class="hotel_profile_tools">
			<div class="profile bg_ff">
				<h2 class="border-b border font3">
					酒店简介
				</h2>
				<div class="font26 content">
					酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介酒店简介
				</div>
			</div>

			<div class="profile bg_ff">
				<h2 class="border-b border font3">
					设施和服务
				</h2>
				<div class="font26 content">
					<div v-for="$index in 10">
						<h3>房间服务设施</h3>
						<p>房间服务设施房间服务设施房间服务设施房间服务设施房间服务设施房间服务设施房间服务设施房间服务设施房间服务设施</p>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<style lang="less">
.hotel_profile_tools {
	position: absolute;
	top: 0;
	left: 0;
	background: #f6f6f6;
	width: 100%;
	min-height: 100%;
	z-index: 100;
	
	.profile {
		padding: 0 .3rem;

		h2 {
			padding: .2rem 0;
			font-weight: bold;
		}

		.content{
			padding: .15rem 0;
			line-height: .4rem;
			text-align: justify;
			div {
				margin-bottom: .15rem;
			}

			h3 {
				padding: .05rem 0 .2rem 0;
				font-size: .26rem;
				font-weight: bold;
			}
		}
	}
}
</style>

<script>
export default {
	created () {
		document.title = '酒店信息'
	}
}
</script>
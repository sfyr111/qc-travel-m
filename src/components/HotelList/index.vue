<template>
<div class="hotel_list">
	<ul>
		<li v-for="$index in 10" class="border-bottom border clearfix">
			<div class="left fl">
				<img src="http://developer.baidu.com/map/static/img/js_fn15.jpg" alt="酒店图片">
			</div>
			<div class="middle fl bsizing">
				<h2 class="overfl-oneline font28">
					深圳格兰云天大酒店
				</h2>
				<div class="comment overfl-oneline color_66">
					<em class="red_icon">4.7分</em>
					120条评论
				</div>
				<p class="overfl-oneline  color_66">
					深南中路深南中路深南中路深南中路
				</p>
			</div>
			<div class="right fl ver-middle red_icon">
				<em>¥</em>
				<i class="font32">650</i>
				<em class="color_66">起</em>
			</div>
		</li>
	</ul>
</div>
</template>

<script></script>

<style lang="less">
.hotel_list li{
	padding: .2rem 0 .2rem .2rem;

	.left {
		width: 2.1rem;
		height: 1.64rem;
		img {
			width: 2.12rem;
			height: 1.64rem;
		}
	}

	.middle {
		width: 3.55rem;
		height: 1.64rem;
		padding: .16rem .05rem .24rem .26rem;

		.comment{
			margin: .16rem 0;
		}
	}

	.right{
		width: 1.65rem;
		height: 1.64rem;

		em{
			position: relative;
			top: .03rem;
		}
	}
}
</style>
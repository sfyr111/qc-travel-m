<template>
	<div class="hotel_comment_list">
		<ul>
			<li v-for="(item, index) in list">
				<h4 class="font28">
					<em class="red_icon">{{ item.score.toFixed(1) }}</em>
					<i>{{ item.title }}</i>
				</h4>
				<div class="content font26">
					{{ item.content }}
				</div>
				<p class="color_66">
					{{ item.created }}
				</p>
			</li>
		</ul>
	</div>
</template>

<style lang="less">
.hotel_comment_list {
	padding-top: 1.76rem;
	li {
		padding: .2rem .3rem;
		background: #fff;
		margin-bottom: .1rem;

		h4 {
			em {
				margin-right: .1rem;
			}
			i {
				font-weight: bold;
			}
		}

		.content{
			line-height: .4rem;
			padding: .16rem 0 .1rem 0;
			text-align: justify;
		}
	}
}
</style>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: []
		}
	}
}
</script>
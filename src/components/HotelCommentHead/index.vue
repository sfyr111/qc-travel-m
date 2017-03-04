<template>
	<div class="hotel_comment_head_container">
		<div class="hotel_comment_head font3 bg_ff border-b border ">
			<h4>
				总评&nbsp;
				<span class="red_icon">
					{{ averageScore }}<em class="font26 color_33">/5.0</em>
				</span>
			</h4>
			<div class="select_comment_type">
				<button v-for="(item, index) in commentArr" :class="{'active': tabIndex === index}" @click="selectCommetnType(index)">
					{{ item.name + (item.comment > 99 ? '99+' : item.comment) }}
				</button>
			</div>
		</div>
	</div>
</template>

<style lang="less">
.hotel_comment_head_container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	text-align: center;
	
	.hotel_comment_head{
		padding: 0 .3rem;
		h4 {
			padding: .2rem 0;
			text-align: left;
		}
		.select_comment_type {
			display: inline-block;
			padding-bottom: .26rem;
			button {
				width: 1.62rem;
				height: .5rem;
				border: 1px solid #999;
				margin-right: .1rem;
				font-size: .26rem;
				border-radius: .05rem;
			}

			button:last-child{
				margin-right: 0;
			}

			button.active{
				border: 1px solid #ee3535;
				color: #ee3535;
			}
		}
	}
}
</style>

<script>
export default {
	props: ['allComment', 'good', 'mid', 'bad', 'averageScore'],
	data () {
		return {
			commentArr: [],
			tabIndex: 0,		//	选择索引
		}
	},

	created () {
		this.commentArr = [
			{
				name: '全部',
				comment: this.allComment
			},
			{
				name: '好评',
				comment: this.good
			},
			{
				name: '中评',
				comment: this.mid
			},
			{
				name: '差评',
				comment: this.bad
			}
		]
	},
	methods: {
		selectCommetnType (index) {
			if (this.tabIndex === index) {
				return
			}

			this.tabIndex = index

			this.$emit('select-comment-type', index)
		}
	}
}
</script>
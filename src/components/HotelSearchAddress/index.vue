<template>
	<div class="hotel_list_address_filter hotel_list_filter_box">
		<div class="main clearfix">
			<div class="side_bar fl">
				<ul>
					<li v-for="(item, index) in sideBar" :class="{'active': index === sideBarIndex}">
						{{ item }}
					</li>
				</ul>
			</div>
			
			<!-- 商业区 -->
			<div class="content fl business">
				<ul>
					<li v-for="$index in 20">
						<div class="border-b border">
							<div class="left fl">商业区商业区商业区</div>
							<span class="fr right">
								<i class="icon iconfont">&#xe664;</i>
							</span>
						</div>
					</li>
				</ul>
			</div>

			<!-- 行政区 -->
			<div class="content fl xingzheng none">
				<ul>
					<li v-for="$index in 20">
						<div class="border-b border">
							<div class="left fl">行政区行政区行政区行政区行政区</div>
							<span class="fr right"></span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			sideBar: ['商业区', '行政区'],
			sideBarIndex: 0,							//	商业区行政区选择索引
		}
	}
}
</script>

<style lang="less">
.hotel_list_address_filter {
	.main{
		width: 100%;
		height: 6.5rem;
		background: #fff;

		.side_bar {
			width: 1.6rem;
			height: 100%;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			background: #e6e6e6;
			font-size: .26rem;

			li{
				text-align: center;
				height: .9rem;
				line-height: .9rem;
			}
			li.active{
				background: #fff;
				color: #e20c1f;
				border-left: 2px solid #e20c1f;
			}
		}

		.content{
			width: 5.9rem;
			height: 100%;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;

			li {
				padding-left: .22rem;
				div{
					height: .72rem;
					line-height: .72rem;

					.left {
						padding-left: .35rem;
					}
					.right{
						margin-right: .32rem;
					}
				}
			}
		}
	}
}

</style>
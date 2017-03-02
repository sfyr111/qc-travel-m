<template>
	<div class="hotel_room_type_price">
		<!-- 描述 -->
		<div class="describe font26">
			<div class="left bsizing">
				<h2 class="font28">高级房</h2>
				<div class="room">
					房间：28平方 <em>3-4层</em>
				</div>
				<div class="type">
					床型：双床1.2米
				</div>
			</div>
			<div class="right bsizing red_icon">
				¥<em class="font32">180</em><i class="color_66">起</i>
				<i class="icon iconfont color_66">&#xe65d;</i>
			</div>
		</div>

		<!-- 房型房价列表 -->
		<div class="list">
			<ul>
				<li v-for="$index in 5">
					<div class="container ver-center clearfix border-bottom-dashed border">
						<div class="left fl font26">不含双早（预付）</div>
						<div class="middle fl bsizing font32 red_icon">
							<em class="font22">¥</em>180
						</div>
						<button class="right fl font3">预订</button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="less">
.hotel_room_type_price {
	.describe {
		background: #fff;
		position: relative;
		.left {
			width: 5.4rem;
			padding-left: .35rem;

			h2 {
				padding: .22rem 0 .18rem 0;
				font-weight: bold;
			}

			.room em {
				margin-left: .16rem;
			}

			.type {
				padding: .2rem 0 .28rem 0;
			}
		}

		.right {
			width: 2.1rem;
			position: absolute;
			top: 50%;
			right: .26rem;
			-webkit-transform: translate3d(0, -50%, 0);
			transform: translate3d(0, -50%, 0);
			text-align: right;

			.iconfont {
				margin-left: .3rem;
				font-size: .32rem;
				position: relative;
				top: .05rem;
			}
		}
	}
	
	.list{
		background: #f1f1f1;
		li {
			padding: 0 .25rem;
			.container{
				height: 1.12rem;
				padding: 0 .2rem 0 .1rem;
				.left {
					text-align: left;
					width: 4rem;
				}
				.middle{
					width: 1.75rem;
					text-align: right;
					padding-right: .26rem;
				}
				.right{
					width: 1.04rem;
					height: .68rem;
					background: #e20c1f;
					color: #fff;
					border-radius: .08rem;
				}
			}
		}
	}
}
</style>
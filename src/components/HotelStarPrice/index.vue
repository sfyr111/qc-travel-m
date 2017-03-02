<template>
	<div class="hotel_search_Price_star_box hotel_list_filter_box" @click="cancel($event)" v-show="show">
			<div class="bg_ff hotel_search_Price_star">
				<!-- 价格 -->
				<div class="hotel_search_price">
					<h3 class="font26">价格</h3>
					<ul class="clearfix">
						<li v-for="(item, index) in price" class="color_66" :class="{'active': priceIndex === index}" @click="selectPrice(item, index)">
							{{ index === 0 ? '不限' : (index === price.length - 1 ? '¥' + item.minPrice + '以上' : (index === 1 ? '¥' + item.maxPrice + '以下' : '¥' + item.minPrice + '－' + '¥' + item.maxPrice)) }}
						</li>
					</ul>
				</div>

				<!-- 星级 -->
				<div class="hotel_search_price hotel_search_star">
					<h3 class="font26">星级</h3>
					<ul class="clearfix">
						<li v-for="(item, index) in star" class="color_66" :class="{'active': starIndex === index}" @click="selectStar(item, index)">
							{{ item.name }}
						</li>
					</ul>
				</div>
			</div>

			<!-- 确定 -->
			<button class="hotel_search_price_star_confirm border-t border" @click="confirm">确定</button>
	</div>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			price: [
				{
					minPrice: '',
					maxPrice: ''
				},
				{
					minPrice: '',
					maxPrice: 150
				},
				{
					minPrice: 151,
					maxPrice: 300
				},
				{
					minPrice: 301,
					maxPrice: 450
				},
				{
					minPrice: 451,
					maxPrice: 600
				},
				{
					minPrice: 601,
					maxPrice: 1000
				},
				{
					minPrice: 1001,
					maxPrice: 99999
				}
			],									//	价格
			priceIndex: 0,				//	价格选择索引
			star: [
				{
					name: '不限',
					star: ''
				},
				{
					name: '一星级',
					star: '10'
				},
				{
					name: '二星级',
					star: '20'
				},
				{
					name: '三星级',
					star: '30'
				},
				{
					name: '四星级',
					star: '40'
				},
				{
					name: '五星级',
					star: '50'
				}
			],											//	星级
			starIndex: 0,						//	星级选择索引
			selectPriceObj: {},				//	选择价格
			selectStarObj: {},					//	选择星级
		}
	},

	methods: {
		//	关闭星级价格筛选
		cancel (e) {
			
			if (e.target !== this.$el) {
				return
			}
			this.$emit('cancel-select-price-star')
		},

		//	价格选择
		selectPrice (item, index) {
			if (this.priceIndex === index) {
				return
			}

			this.priceIndex = index
			this.selectPriceObj = item
		},

		//	星级筛选
		selectStar (item, index) {
			if (this.starIndex === index) {
				return
			}

			this.starIndex = index
			this.selectStarObj = item
		},

		//	确定
		confirm () {
			let msg = {
				price: this.selectPriceObj,
				star: this.selectStarObj
			}
			this.$emit('confirm-star-price', msg)
		}
	}
}
</script>

<style lang="less">
.hotel_search_Price_star_box{
	.hotel_search_Price_star{
		padding: .22rem .4rem .14rem .4rem;

		.hotel_search_price {
			h3 {
				padding-bottom: .14rem;
			}
			
			ul {
				li {
					width: 1.58rem;
					height: .42rem;
					line-height: .42rem;
					text-align: center;
					float: left;
					background: #e6e6e6;
					margin: 0 .12rem .18rem 0;
				}
				li:nth-child(4n) {
					margin-right: 0;
				}
				li.active{
					background: #e20c1f;
					color: #fff;
				}
			}
		}

		.hotel_search_star{
			margin-top: .1rem;
		}
	}

	.hotel_search_price_star_confirm{
		width: 100%;
		height: .68rem;
		background: #fff;
		font-size: .28rem;
	}
}
</style>
<template>
	<div class="hotel_list_search clearfix bg_cc">
		<!-- 返回箭头 -->
		<span class="fl cancel_input ver-middle" v-show="isShow" @click="cancelInput">
			<i class="icon iconfont">&#xe63f;</i>
		</span>

		<!-- 地址 -->
		<div class="left bsizing ver-middle fl" @click="showSelectCity" v-show="!isShow">
			<em class="font28">{{ cityName.substring(0, 2) }}</em>
			<i class="icon iconfont">&#xe615;</i>
		</div>
		
		<!-- 搜索框 -->
		<div class="right bsizing fl">
			<label>
				<i class="icon iconfont">&#xe651;</i>
				<input type="text" placeholder="酒店名" @focus="getFocus($event)" v-model="hotelName">
			</label>
		</div>

		
		<!-- 搜索按钮 -->
		<span class="fl input_confirm ver-middle" v-show="isShow" @click="inputSearch">搜索</span>
	</div>
</template>

<style lang="less">
.hotel_list_search {
	padding: .25rem 0;
	
	.cancel_input, .input_confirm {
		width: 1rem;
		height: .68rem;
	}
	
	.cancel_input {
		width: .6rem;
	}
	.left {
		width: 1.3rem;
		height: .68rem;

		i {
			font-size: .24rem;
			position: relative;
			top: .02rem;
			left: .1rem;
		}
	}

	.right {
		width: 5.9rem;
		height: .68rem;
		padding-left: .25rem;
		position: relative;
		background: #fff;
		border-radius: .05rem;
		
		i {
			position: absolute;
			top: 50%;
			left: .25rem;
			-webkit-transform: translate3d(0, -50%, 0);
			transform: translate3d(0, -50%, 0);
		}

		input {
			width: 5rem;
			height: 100%;
			margin-left: .4rem;
		}
	}
}
</style>

<script>
import showTips from '../ShowTips'
export default {
	props: {
		cityName: {
			type: String,
			default: '北京'
		}
	},

	data () {
		return {
			isShow: false,
			inputTimer: null,				//	输入监控
			hotelName: ''						//	酒店名
		}
	},
	components: {
		showTips
	},

	methods: {
		//	选择城市
		showSelectCity () {
			this.$emit('show-select-city')
		},

		//	获取焦点
		getFocus (e) {
			this.isShow = true
		},

		//	取消搜索
		cancelInput () {
			this.isShow = false
		},

		//	酒店名查询
		inputSearch () {
			if (!this.hotelName) {
				showTips('酒店名不能为空', 2500)
				return
			}
			this.$emit('hotel-name-search', this.hotelName)
		}
	}
}
</script>
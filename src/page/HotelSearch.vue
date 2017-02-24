<template>
	<div class="hotel_search_container">
		<!-- 位置 -->
		<!-- 获取我的位置 -->
		<div  class="hotel_search_main">
			<div class="hotel_search_lay my_pos clearfix ver-middle">
				<span class="fl bsizing hotel_search_icon">
					<i class="icon iconfont">&#xe60a;</i>
					</span>
				<div class="fl hotel_search_lay_right border border-b ver-middle">
					<em>我的位置</em>
				</div>
			</div>
			
			<!-- 选择城市 -->
			<div class="clearfix hotel_search_lay hotel_search_destination ver-middle">
				<span class="fl bsizing hotel_search_icon">
					<i class="icon iconfont red_icon">&#xe68b;</i>
				</span>
				<div class="fl hotel_search_lay_right ver-middle">
					<span class="fl color_66 hotel_search_lay_title">目的地</span>
					<div class="fl color_33 hotel_search_lay_str">
						深圳
					</div>
				</div>
			</div>
		</div>

		<!-- 日期 -->
		<!-- 住店日期 -->
		<div  class="hotel_search_main">
			<div class="clearfix hotel_search_lay hotel_search_destination ver-middle">
				<span class="fl bsizing hotel_search_icon">
					<i class="icon iconfont orange_icon home">&#xe6e9;</i>
				</span>
				<div class="fl hotel_search_lay_right color_33 border border-b ver-middle">
					<span class="fl color_66 hotel_search_lay_title">入住</span>
					
					<!-- 日历组件 -->
					<group class="fl hotel_search_date bsizing color_33 hotel_search_lay_str">
			      <calendar v-model="startDate" title="" disable-past></calendar>
			    </group>
					
				</div>
			</div>
		
			<!-- 离店日期 -->
			<div class="clearfix hotel_search_lay hotel_search_destination ver-middle">
				<span class="fl bsizing hotel_search_icon">
					<i class="icon iconfont orange_icon leave">&#xe63e;</i>
				</span>
				<div class="fl hotel_search_lay_right color_33 ver-middle">
					<span class="fl color_66 hotel_search_lay_title">离店</span>

					<!-- 日历组件 -->
					<group class="fl hotel_search_date bsizing color_33 hotel_search_lay_str">
			      <calendar v-model="endDate" title="" disable-past></calendar>
			    </group>
				</div>
			</div>
		</div>

		<!-- 开始查询 -->
		<M-D-Button :font="style" :str="str" @btn-click="btnClick"></M-D-Button>

		<loading v-model="isLoading"></loading>

		
	</div>
</template>

<script>
import { MDButton } from '../components'
import { Loading, Group, Calendar, Cell  } from 'vux'


export default {
	data () {
		return {
			style: {
				width: '4.6rem',
				height: '.8rem',
				'font-size': '.32rem',
				'color': '#fff',
				background: '#ee3535',
				'margin': '.5rem auto 0 auto',
				display: 'block',
				'border-radius': '.1rem'
			},									//	按钮样式
			str: '开始查询',		//	按钮内容
			isLoading: false, 		//	vux loading
			startDate: '',				//	住店日期
			endDate: ''						//	离店日期
		}
	},

	components: {
		MDButton,
		Loading,
		Group,
		Calendar,
		Cell
	},

	methods: {
		btnClick () {
			console.log('btnClick')
			this.isLoading = true
			setTimeout(function () {
				this.isLoading = false
			}.bind(this), 2000)
		}
	}
}
</script>


<style lang="less">

.hotel_search_container{
	padding: .2rem;

	.hotel_search_main {
		background: #fff;
		border-radius: .08rem;
		margin-bottom: .2rem;
	}

	.hotel_search_lay{
		height: 1.1rem;
		font-size: .3rem;

		.icon {
			font-size: .46rem;
		}
		.home{
			font-size: .5rem;
			position: relative;
			left: -.02rem;
		}
		span.hotel_search_icon{
			width: .88rem;
			padding: 0 .16rem 0 .15rem;
		}

		.hotel_search_lay_right {
			width: 6rem;
			height: 1.1rem;
			span.hotel_search_lay_title{
				width: 1.18rem;
				padding: 0;
			}

			div.hotel_search_lay_str{
				width: 4.82rem;
			}
			.hotel_search_date{
				text-align: right;
				padding-right: .2rem;
			}
			em{
				width: 100%;
			}
		}
	}
	.my_pos {
		color: #35a9fb;
	}
}
</style>
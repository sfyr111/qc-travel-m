<template>
	<transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
		<div class="a_box">
			<div class="row r_city">
				<span class="city">深圳</span>
				<i class="icon iconfont icon-wangfan"></i>
				<span class="city">北京</span>
			</div>
			<div class="row r_date clearfix">
				<div class="fl date">
					<span class="date_name">去程</span>
					<group class="fr date_time hotel_search_lay_str">
				      <calendar v-model="startDate" title="" disable-past></calendar>
				    </group>
				</div>
				<div class="fr date">
					<span class="date_name">返程</span>
					<group class="fr not_choose date_time hotel_search_lay_str">
				      <calendar v-model="endDate" title="" disable-past></calendar>
				    </group>
				</div>
			</div>
			<!-- 开始查询 -->
			<M-D-Button :font="style" :str="str" @btn-click="btnClick"></M-D-Button>
			<loading v-model="isLoading"></loading>
		</div>
	</transition>
</template>
<script>
	import { MDButton } from '../components'
	import { Loading, Group, Calendar } from 'vux'
	import { mapGetters, mapActions } from 'vuex'
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
				str: '搜索机票',		//	按钮内容
				startDate: '',				//	住店日期
				endDate: ''						//	离店日期
			}
		},
		computed: {
		    ...mapGetters({
			    isLoading: 'getLoading'
		    }),
		},
		components: {
			MDButton,
			Loading,
			Group,
			Calendar
		},
		methods: {
			btnClick () {
				this.$store.dispatch('upLoadingStatus', true)
				setTimeout(function () {
					this.$store.dispatch('upLoadingStatus', false)
				}.bind(this), 2000)
			}
		}
	}
</script>
<style lang="less" scoped>
	.a_box {
		margin: .34rem auto 0;
		padding: .10rem .40rem;
		width: 6.10rem;
		height: 4.40rem;
		border-radius: 6px;
		background-color: #ffffff;
		.row {
			height: 1.30rem;
			line-height: 1.30rem;
		}
		.r_city {
			border-bottom: .01rem solid #cccccc;
			.icon {
				font-size: .44rem;
				color: #5495e6;
			}
			.city {
				display: inline-block;
				text-align: center;
				font-size: .4rem;
				width: 2.70rem;
			}
		}
		.r_date {
			.date {
				width: 2.74rem;
				border-bottom: .01rem solid #cccccc;
				font-size: .3rem;
				.date_name {
					margin-left: .30rem;
					color: #999999;
				}
				.date_time {
					width: 1.80rem;
					margin-top: .09rem;
				}
				.not_choose {
					color: #999999;
				}
			}
		}
	}
</style>
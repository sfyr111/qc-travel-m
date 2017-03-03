<template>
	<transition name="slide">
		<div class="hotel_comment" v-scroll-bottom="{throttle: 400, distance: 100, loadMore: loadMore}">
			<hotel-comment-head
			:all-comment="allComment"
			:good="good"
			:mid="mid"
			:bad="bad"
			:average-score="averageScore"
			@select-comment-type="selectCommentType"
			></hotel-comment-head>

			<!-- 评论列表 -->
			<hotel-comment-list :list="getHotelComment"></hotel-comment-list>

			<!-- loading more -->
			<loading-more v-if="getHotelComment.length && !isLoadAll"></loading-more>

			<!-- 加载完全部 -->
			<no-data :str="loadAllData" :style-obj="styleObj" v-if="isLoadAll && getHotelComment.length > 10"></no-data>

			<!-- 没有数据 -->
			<no-data :str="loadNoData" v-if="isLoadAll && !getHotelComment.length"></no-data>
		</div>
	</transition>
</template>

<style lang="less">
.hotel_comment {
	width: 100%;
	min-height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: #f6f6f6;
}
</style>

<script>
import { HotelCommentHead, HotelCommentList, LoadingMore, NoData } from '../components'
import configUrl from '../data/configUrl'
import { mapActions, mapGetters } from 'vuex'

export default {
	data () {
		return {
			allComment: '',				//	所有评论数
			good: '',							//	好评数
			mid: '',							//	中评
			bad: '',							//	差评
			averageScore: '',			//	评分
			page: 1,
			pageSize: 10,					//	条数
			hotelId: '',
			level: '',						//string 差评1、中评2、好评3，若此参数为空，则获取全部评价
			commentUrl: configUrl.hotelComment.dataUrl,		//	评论列表
			isCanGetComment: true,		//	获取评论数节流
			isLoadAll: false,					//	是否加载完全部
			loadAllData: '没有更多了哦~',
			styleObj: {
				'width': '100%',
				'height': 'auto',
				'line-height': '1.5',
				'text-align': 'center',
				'padding': '.2rem 0',
				'font-size': '.28rem'
			},
			loadNoData: '暂无评论'
		}
	},
	created () {
		let query = this.$route.query
		this.hotelId = query.hotelId
		this.allComment = query.allComment
		this.good = query.good
		this.mid = query.mid
		this.bad = query.bad
		this.averageScore = query.averageScore

		//	初始化酒店评论
		this.checkHotelComment(true)
	},
	components: {
		HotelCommentHead,
		HotelCommentList,
		LoadingMore,
		NoData
	},

	methods: {
		//	vuex actions
		...mapActions(['setHotelComment']),

		//	选择评论类型
		selectCommentType (index) {
			switch (index) {
				//	所有
				case 0:
					this.level = ''
					this.checkHotelComment(true)
					break;

				//	好评
				case 1:
					this.level = '3'
					this.checkHotelComment(true)
					break;

				//	中评
				case 2:
					this.level = '2'
					this.checkHotelComment(true)
					break;

				//	差评
				default:
					this.level = '1'
					this.checkHotelComment(true)
					break;
			}
		},

		//	查询酒店评论
		checkHotelComment (isInit) {
			//	初始化重置参数
			if (isInit) {
				this.page = 1
				this.isCanGetComment = true
				this.isLoadAll = false

				//	设置滚动条到底部
				document.body.scrollTop = 0
			}

			//	请求节流 或者加载完全部
			if (!this.isCanGetComment || this.isLoadAll) {
				return
			}

			let self = this
			let opt = {
				type: 'get',
				url: this.commentUrl,
				isInit: isInit,
				data: {
					hotelId: this.hotelId,
					level: this.level,
					page: this.page,
					pageSize: this.pageSize
				},
				success: function (res) {
					self.isCanGetComment = true
					
					if (res.length < self.pageSize) {
						self.isLoadAll = true
						return
					}

					self.page ++
				},
				fail: function (res) {
					self.isCanGetComment = true
					alert(res)
				}
			}

			this.setHotelComment(opt)
		},

		//	滚动到底部加载更多
		loadMore () {
			this.checkHotelComment(false)
		}
	},

	computed: {
		...mapGetters(['getHotelComment'])
	}
}
</script>
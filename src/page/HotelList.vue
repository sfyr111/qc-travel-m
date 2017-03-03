<template>
	<div class="hotel_list_container" v-scroll-bottom="{throttle: 400, distance: 100, loadMore: loadMore}">
		<div class="hotel_list_search_fixed">
			<!-- 城市，酒店名 -->
			<hotel-list-head
			:city-name="cityName"
			@show-select-city="showSelectCity"
			></hotel-list-head>
		
			<!-- 筛选按钮 -->
			<column-button class="bg_f6 hotel_search_button font26 border-b border">
				<div class="flex_btn" @click="columnBtnClick" :class="{'active': isSelectStartDate}">
					入{{ showStartDate }}
					
					<i class="icon iconfont" v-if="!isSelectStartDate">&#xe615;</i>
					<i class="icon iconfont" v-else>&#xe621;</i>
				</div>
				<div class="flex_btn" :class="{'active': isSelectEndDate}">
					离{{ showEndDate }}
			    
					<i class="icon iconfont" v-if="!isSelectEndDate">&#xe615;</i>
					<i class="icon iconfont" v-else>&#xe621;</i>
				</div>
				<div class="flex_btn" @click="columnBtnClick(2)" :class="{'active': isSelectStarPrice}">
					星级价格

					<i class="icon iconfont" v-if="!isSelectStarPrice">&#xe615;</i>
					<i class="icon iconfont" v-else>&#xe621;</i>
				</div>
				<div class="flex_btn" @click="columnBtnClick(3)" :class="{'active': isSelectAddress}">
					位置区域
					<i class="icon iconfont" v-if="!isSelectAddress">&#xe615;</i>
					<i class="icon iconfont" v-else>&#xe621;</i>
				</div>
			</column-button>
		</div>

		<!-- 星级，价格 -->
		<hotel-star-price
		:show="isSelectStarPrice"
		@cancel-select-price-star="cancelSelectPriceStar"
		@confirm-star-price="confirmStarPrice"
		></hotel-star-price>

		<!-- 位置，区域 -->
		<hotel-search-address
		:show="isSelectAddress"
		:city-id="cityId"
		:business="getHotelBusinessZone"
		:region="getHotelAdministrativeRegion"
		@cancel-select-address="cancelSelectAddress"
		@confirm-select-address="confirmSelectAddress"
		></hotel-search-address>

		<!-- 热门城市等 -->
		<city-air
		:show="isShowHotelCityBox"
		:city-list="getHotelCity"
		:active-city="activeCity"
		:city-query="getHotelCityInput"
		@getCity="selectCity"
		@search-key="inputGetCityId"
		></city-air>

		<!-- 日历组件 -->
		<!-- 入住日期 -->
		<div class="calendar_startdate" @click="startSelectStartDate($event)">
			<group class="color_33">
	      <calendar
	      v-model="checkInDate"
	      title=""
	      disable-past
	      :weeks-list="weeksList"
	      :replace-text-list="todayStr"
	      @on-change="selectStartDate"
	      @click.native="startSelectStartDate"
	      @on-cancel="cancelCalendarStartDate"
	      ></calendar>
	    </group>
	  </div>

    <!-- 离店日期 -->
    <div class="calendar_enddate" @click="startSelectEndDate($event)">
			<group class="color_33">
	      <calendar
	      v-model="checkOutDate"
	      title=""
	      disable-past
	      :weeks-list="weeksList"
	      :replace-text-list="todayStr"
	      :highlight-weekend="highlightWeekend"
	      :start-date="endDate2"
	      @on-change="selectEndDate"
	      @on-cancel="cancelCalendarEndDate"
	      ></calendar>
	    </group>
		</div>

		<!-- 酒店列表 -->
		<hotel-list :list="getHotelList" @to-hotel-detail="toHotelDetail"></hotel-list>
    
    <!-- loading more -->
    <loading-more v-if="getHotelList.length && !isLoadAll"></loading-more>

    <!-- 加载完全部 -->
    <no-data :str="loadAllData" :style-obj="styleObj" v-if="isLoadAll && getHotelList.length > 10"></no-data>

    <!-- 没有数据 -->
    <no-data :str="loadNoData" v-if="isLoadAll && !getHotelList.length"></no-data>
	</div>
</template>

<script>
import { Loading, Group, Calendar, Cell, dateFormat   } from 'vux'
import configUrl from '../data/configUrl'
import { mapActions, mapGetters, mapMutations  } from 'vuex'
import { 
	HotelList,
	HotelListHead,
	HotelListSearch,
	ColumnButton,
	HotelStarPrice,
	HotelSearchAddress,
	CityAir,
	LoadingMore,
	NoData
} from '../components'

export default {
	data () {
		return {
			cityId:'824297',											//	城市ID
			checkInDate: '',							 //	住店日期
			checkOutDate: '',							//	离店日期
			minPrice: '',									//	最小 价格
			maxPrice: '',									//	最大 价格
			star: '',											//	星级
			cbdId: '',										//	商业区id
			disId: '',										//	行政区id
			page: 1,
			pageSize: 10,
			hotelSortType: 'sort_hot_level_desc',   //	列表排序默认
			name: '',											//	酒店名称

			cityName: '北京',								//	选择城市
			isShowHotelCityBox: false,				//	是否显示选择城市
			activeCity: {											//	默认选中城市
				cityName: '北京'
			},																
			isInitCity: true,									//	是否是初始化城市
			hotelCityUrl: configUrl.hotelCity.dataUrl,   //	酒店城市查询URL	 	
			hotelCityInputUrl: configUrl.hotelCityInput.dataUrl,   //	酒店模糊查询URL
			hotelAddressUrl: configUrl.hotelArea.dataUrl,		//	位置区域URL
			hotelListUrl: configUrl.hotelList.dataUrl,					//	酒店列表查询URL
			endDate2: '',												//	结束日期开始选择
			weeksList: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
			todayStr: {
				'TODAY':'今'
			},					//	替换今天日期为今
			highlightWeekend: true,						//	高亮周末
			dayTime: 24 * 60 * 60 * 1000,			//	一天的时间戳
			showStartDate: '',								//	显示开始日期
			showEndDate: '',									//	显示结束日期
			isSelectStarPrice: false,					//	星级价格显示变量
			isSelectAddress: false,						//	位置区域显示变量
			isInitBusinessData: true,							//	是否可以获取商业区数据
			isCanGetBusinessData: true,           //	商业区域数据节流
			isInitRegionData: true,							//	是否可以获取行政区数据
			isCanGetRegionData: true,           //	行政区域数据节流
			isSelectStartDate: false,					//	选择住店日期变量		
			isSelectEndDate: false,					//	选择离店日期变量
			isCanGetHotelList: true,				//	酒店列表数据节流
			isLoadAll: false,      					//	是否加载完全部	
			loadAllData: '没有更多了哦~',
			styleObj: {
				'width': '100%',
				'height': 'auto',
				'line-height': '1.5',
				'text-align': 'center',
				'padding': '.2rem 0',
				'font-size': '.28rem'
			},
			isInitCalendar1: true,					//	是否初始化日历
			isInitCalendar2: true,					//	是否初始化日历
			loadNoData: '暂未搜索到相关酒店'
		}
	},

	components: {
		HotelList,
		HotelListHead,
		HotelListSearch,
		ColumnButton,
		HotelStarPrice,
		HotelSearchAddress,
		CityAir,
		Loading,
		Group,
		Calendar,
		Cell,
		LoadingMore,
		NoData
	},

	created () {
		document.body.style.background = '#fff'
		//	初始化城市 城市id
		let query = this.$route.query
		this.cityId = query.cityId
		this.cityName = query.cityName
		this.activeCity.cityName = query.cityName
		this.checkInDate = query.startDate
		this.checkOutDate = query.endDate
		this.endDate2 = dateFormat(new Date(+new Date(this.startDate) + this.dayTime), 'YYYY-MM-DD')

		//	设置显示日期
		this.showStartDate = this.checkInDate.substring(5)
		this.showEndDate = this.checkOutDate.substring(5)

		//	初始化酒店列表
		this.checkHotelList(true)
	},

	methods: {
		//	vuex actions
		...mapActions([ 'hotelCityInput', 'hotelCity', 'hotelArea', 'setHotelList' ]),

		//	vuex mutations
		...mapMutations([
      'HOTELLIST' 
    ]),

		//	显示选择地址弹窗
		showSelectCity () {
			this.isShowHotelCityBox = true
			this.isSelectAddress = false

			if (!this.isInitCity) {
				return
			}

			let self = this
			//	初始化查询热门城市
			let opt = {
				type: 'get',
				url: this.hotelCityUrl,
				errMsg: '查询城市失败'
			}

			this.hotelCity(opt).then(function (res) {
				self.isInitCity = false
			})
		},

		//	模糊匹配查询城市ID
		inputGetCityId (name) {
			console.log(name)
			let self = this
			//	根据城市查id
			let opt = {
				type: 'get',
				url: this.hotelCityInputUrl,
				errMsg: '查询城市失败',
				data: {
					name: name
				}
			}

			this.hotelCityInput(opt)
			.catch(function (err) {
				console.log(err)
			})
		},

		//	选择城市
		selectCity (city) {
			let cityId = city.id || city[0]
			cityId = cityId.toString()
			this.isShowHotelCityBox = false

			//	两次选择同一个城市退出
			if (this.cityId === cityId) {
				return
			}

			this.cityName = city.name || city[1]
			this.cityId = cityId
			this.activeCity.cityName = this.cityName 

			//	重置可以重新获取位置区域数据
			this.isInitBusinessData = true
			this.isInitRegionData = true

			//	重置商业区行政区id
			this.cbdId = ''
			this.disId = ''

			//	重新刷新酒店列表
			this.checkHotelList(true)
		},

		//	住店日期弹出层 (开始选择住店日期)
		startSelectStartDate (e) {
			//console.log('住店日期开始选择')
			this.isSelectAddress = false
			this.isSelectStarPrice = false

			//	阻止冒泡
			if (e.target === this.$el.querySelector('.calendar_startdate') || e.target === this.$el.querySelector('.calendar_startdate .weui-cell__ft') || e.target === this.$el.querySelector('.calendar_startdate .weui-cell')) {
				this.isSelectStartDate = true
			}
		},

		//选择住店日期
		selectStartDate: function (val) {
			//console.log(val)
			this.isSelectStartDate = false
			this.checkInDate = val
			let startDate = +new Date(val)
			let endDate = +new Date(this.checkOutDate)
			let endDate2 = dateFormat(new Date(startDate + this.dayTime), 'YYYY-MM-DD')
			
			
			this.endDate2 = endDate2
			//	住店日期大于离店日期
			if (startDate >= endDate) {
				this.checkOutDate = endDate2
				//	设置离店显示日期
				this.showEndDate = endDate2.substring(5)
			}

			//	设置显示日期
			this.showStartDate = val.substring(5)
			

			if (!this.isInitCalendar1) {
				//	重新刷新酒店列表
				this.checkHotelList(true)
			}
			this.isInitCalendar1 = false
		},

		//	取消选择住店日期
		cancelCalendarStartDate () {
			this.isSelectStartDate = false
		},

		//	离店日期弹出层 (开始选择离店日期)
		startSelectEndDate (e) {
			this.isSelectAddress = false
			this.isSelectStarPrice = false
			
			//	阻止冒泡
			if (e.target === this.$el.querySelector('.calendar_enddate') || e.target === this.$el.querySelector('.calendar_enddate .weui-cell__ft') || e.target === this.$el.querySelector('.calendar_enddate .weui-cell')) {
				this.isSelectEndDate = true
			}
		},

		//	选择离店日期
		selectEndDate (val) {
			//console.log('离店日期：' + val)
			if (+new Date(val) < +new Date(this.endDate2)) {
				val = this.endDate2
			}

			this.checkOutDate = val
			//	设置离店显示日期
			this.showEndDate = val.substring(5)
			this.isSelectEndDate = false

			//	重新刷新酒店列表
			if (!this.isInitCalendar2) {
				console.log(44)
				this.checkHotelList(true)
			}
			this.isInitCalendar2 = false
			
		},

		//	取消选择离店日期
		cancelCalendarEndDate () {
			this.isSelectEndDate = false
		},


		//	筛选条件按钮
		columnBtnClick (index) {
			switch (index) {
				case 2:
					this.isSelectStarPrice = !this.isSelectStarPrice
					this.isSelectAddress = false
					break;

				case 3:
					this.isSelectAddress = !this.isSelectAddress
					this.isSelectStarPrice = false

					//	获取商业区
					this.getBusinessAddressData()

					//	获取行政区
					this.getRegionAddressData()
					break;

				default:
					return
			}
		},

		//	退出星级价格筛选
		cancelSelectPriceStar () {
			this.isSelectStarPrice = false
		},

		//	确定选择价格星级
		confirmStarPrice (msg) {
			//console.log(msg)
			this.isSelectStarPrice = false
			this.minPrice = msg.price.minPrice
			this.maxPrice = msg.price.maxPrice
			this.star = msg.star.star

			//	重新刷新酒店列表
			this.checkHotelList(true)
			console.log(msg)
		},

		//	取消选择位置区域
		cancelSelectAddress () {
			this.isSelectAddress = false
		},

		//	获取商业区域数据
		getBusinessAddressData () {
			if (!this.isInitBusinessData || !this.isCanGetBusinessData) {
				return
			}
			
			this.isCanGetBusinessData = false

			let self = this
			let opt = {
				type: 'get',
				url: this.hotelAddressUrl,
				errMsg: '获取位置区域失败',
				data: {
					cityId: this.cityId,
					areaType: 2
				}
			}	

			this.hotelArea(opt).then(function () {
				self.isInitBusinessData = false
				self.isCanGetBusinessData = true
			})
			.catch(function (err) {
				self.isInitBusinessData = true
				self.isCanGetBusinessData = true
			})
		},

		//	获取行政区域数据
		getRegionAddressData () {
			if (!this.isInitRegionData || !this.isCanGetRegionData) {
				return
			}
			
			this.isCanGetRegionData = false

			let self = this
			let opt = {
				type: 'get',
				url: this.hotelAddressUrl,
				errMsg: '获取位置区域失败',
				data: {
					cityId: this.cityId,
					areaType: 1
				}
			}	

			this.hotelArea(opt).then(function () {
				self.isInitRegionData = false
				self.isCanGetRegionData = true
			})
			.catch(function (err) {
				self.isInitRegionData = true
				self.isCanGetRegionData = true
			})
		},


		//	位置区域确定选择
		confirmSelectAddress (msg) {
			//console.log(msg)
			this.cbdId = msg.cbdId.id
			this.disId = msg.disId.id

			//	重新刷新酒店列表
			this.checkHotelList(true)
		},

		//	查询酒店列表
		loadMore () {
			this.checkHotelList(false)
		},

		checkHotelList (isInit) {
			//	初始化重置页数
			if (isInit) {
				this.page = 1
				this.isLoadAll = false
				let obj = {
					isInit: isInit,
					result: {
						searchedHotelInfos: []
					}
				}

				this.HOTELLIST(obj)
			}


			if (!this.isCanGetHotelList || this.isLoadAll) {
				return
			}

			let data = {
				cityId: this.cityId,
				checkInDate: this.checkInDate,
				checkOutDate: this.checkOutDate,
				minPrice: this.minPrice,
				maxPrice: this.maxPrice,
				star: this.star,
				cbdId: this.cbdId,
				disId: this.disId,
				page: this.page,
				pageSize: this.pageSize,
				hotelSortType: this.hotelSortType,
				name: this.name
			}

			let self = this
			let opt = {
				type: 'get',
				url: this.hotelListUrl,
				errMsg: '获取酒店列表失败，请稍后再试',
				data: data,
				isInit: isInit
			}

			this.setHotelList(opt).then(function (resp) {
				self.isCanGetHotelList = true
				//	如果全部加载完
				if (resp.searchedHotelInfos.length < self.pageSize) {
					self.isLoadAll = true
					return
				}

				self.page ++
			}, function (res) {
				alert(res)
			})
			.catch(function (err) {
				self.isCanGetHotelList = true
			})
		},

		//	跳转酒店详情
		toHotelDetail (hotelId) {
			this.$router.push({
				name: 'hoteldetail',
				query: {
					hotelId: hotelId,
					checkInDate: this.checkInDate,
					checkOutDate: this.checkOutDate
				}
			})
		}
	},

	computed: {
		...mapGetters([
			'getHotelCity',
			'getHotelCityInput',
			'getHotelBusinessZone',
			'getHotelAdministrativeRegion',
			'getHotelList'
		])
	}
}
</script>

<style lang="less" scoped>
	.hotel_list_search_fixed{
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 110;

		.hotel_search_button {
			i.iconfont {
				font-size: .24rem;
				margin-left: .05rem;
				color: #a0a0a0;
			}
		}
	}
	.hotel_list_container{
		padding-top: 1.79rem;
		.hotel_list_filter_box {
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .5);
			
			position: fixed;
			top: 1.79rem;
			left: 0;
			z-index: 100;
		}

		.flex_btn.active{
			color: #ee3535;

			i {
				color: #ee3535;
			}
		}
	}
</style>
<style lang="less">
	/*-- 日历样式 --*/
	.calendar_startdate, .calendar_enddate{
		position: fixed;
		width: 25%;
		
		top: 1.18rem;
		left: 0;
		z-index: 120;
		.weui-cell{
			opacity: 0;
			height: .66rem;
		}
		.weui-cells{
			overflow: auto;
		}
	}
	.calendar_enddate{
		left: 25%;
	}
</style>
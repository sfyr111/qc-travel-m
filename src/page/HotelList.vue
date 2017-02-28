<template>
	<div class="hotel_list_container">
		<div class="hotel_list_search_fixed">
			<!-- 城市，酒店名 -->
			<hotel-list-head
			:city-name="cityName"
			@show-select-city="showSelectCity"
			></hotel-list-head>
		
			<!-- 筛选按钮 -->
			<column-button class="bg_f6 hotel_search_button font26 border-b border">
				<div class="flex_btn" @click="columnBtnClick">
					入{{ showStartDate }}
					
					<i class="icon iconfont">&#xe615;</i>
				</div>
				<div class="flex_btn">
					离{{ showEndDate }}
			    
					<i class="icon iconfont">&#xe615;</i>
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
		<hotel-search-address v-show="isSelectAddress"></hotel-search-address>

		<!-- 酒店列表 -->
		<hotel-list></hotel-list>

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
		<group class="color_33 calendar_startdate">
      <calendar
      v-model="checkInDate"
      title=""
      disable-past
      :weeks-list="weeksList"
      :replace-text-list="todayStr"
      @on-change="selectStartDate"
      @click.native="startSelectStartDate"
      ></calendar>
    </group>

    <!-- 离店日期 -->
		<group class="color_33 calendar_enddate">
      <calendar
      v-model="checkOutDate"
      title=""
      disable-past
      :weeks-list="weeksList"
      :replace-text-list="todayStr"
      :highlight-weekend="highlightWeekend"
      :start-date="endDate2"
      @on-change="selectEndDate"
      @click.native="startSelectEndDate"
      ></calendar>
    </group>

    
	</div>
</template>

<script>
import { Loading, Group, Calendar, Cell, dateFormat   } from 'vux'
import configUrl from '../data/configUrl'
import { mapActions, mapGetters } from 'vuex'
import { 
	HotelList,
	HotelListHead,
	HotelListSearch,
	ColumnButton,
	HotelStarPrice,
	HotelSearchAddress,
	CityAir
} from '../components'

export default {
	data () {
		return {
			hotelListData: {												//	酒店列表查询参数
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
				name: ''											//	酒店名称
			},
			cityName: '北京',								//	选择城市
			isShowHotelCityBox: false,				//	是否显示选择城市
			activeCity: {											//	默认选中城市
				cityName: '北京'
			},																
			isInitCity: true,									//	是否是初始化城市
			hotelCityUrl: configUrl.hotelCity.dataUrl,   //	酒店城市查询URL	 	
			hotelCityInputUrl: configUrl.hotelCityInput.dataUrl,   //	酒店模糊查询URL
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
		Cell
	},

	created () {
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
	},

	methods: {
		//	vuex actions
		...mapActions([ 'hotelCityInput', 'hotelCity' ]),

		//	显示选择地址弹窗
		showSelectCity () {
			this.isShowHotelCityBox = true

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
			this.cityName = city.name || city[1]
			this.cityId = city.id || city[0]
			this.isShowHotelCityBox = false
			this.activeCity.cityName = this.cityName 
		},

		//	住店日期弹出层
		startSelectStartDate () {
			console.log('住店日期开始选择')
			this.isSelectAddress = false
			this.isSelectStarPrice = false
		},

		//选择住店日期
		selectStartDate: function (val) {
			//console.log(val)
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

		},

		//	离店日期弹出层
		startSelectEndDate () {
			this.isSelectAddress = false
			this.isSelectStarPrice = false
		},

		//	离店日期
		selectEndDate (val) {
			//console.log('离店日期：' + val)
			if (+new Date(val) < +new Date(this.endDate2)) {
				val = this.endDate2
			}

			this.checkOutDate = val
			//	设置离店显示日期
			this.showEndDate = val.substring(5)
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
		}
	},

	computed: {
		...mapGetters(['getHotelCity', 'getHotelCityInput'])
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
		height: .66rem;
		top: 1.18rem;
		left: 0;
		overflow: hidden;
		z-index: 120;
		.weui-cell{
			opacity: 0;
		}
	}
	.calendar_enddate{
		left: 25%;
	}
	.overflow{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
<template>
	<div class="hotel_search_container">
		<div class="hotel_search_wrapper">
			<!-- 位置 -->
			<!-- 获取我的位置 -->
			<div  class="hotel_search_main">
				<div class="hotel_search_lay my_pos clearfix ver-middle" @click="getMyPosCity">
					<span class="fl bsizing hotel_search_icon">
						<i class="icon iconfont">&#xe60a;</i>
						</span>
					<div class="fl hotel_search_lay_right border border-b ver-middle">
						<em>我的位置</em>
					</div>
				</div>
				
				<!-- 选择城市 -->
				<div class="clearfix hotel_search_lay hotel_search_destination ver-middle" @click="ShowSelectCityBox">
					<span class="fl bsizing hotel_search_icon">
						<i class="icon iconfont red_icon">&#xe68b;</i>
					</span>
					<div class="fl hotel_search_lay_right ver-middle">
						<span class="fl color_66 hotel_search_lay_title">目的地</span>
						<div class="fl color_33 hotel_search_lay_str">
							{{ showCity }}
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
				      <calendar
				      v-model="startDate"
				      title=""
				      disable-past
				      :weeks-list="weeksList"
				      :replace-text-list="todayStr"
				      @on-change="selectStartDate"
				      ></calendar>
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
				      <calendar
				      v-model="endDate"
				      title=""
				      disable-past
				      :weeks-list="weeksList"
				      :replace-text-list="todayStr"
				      :highlight-weekend="highlightWeekend"
				      :start-date="endDate2"
				      @on-change="selectEndDate"
				      ></calendar>
				    </group>
					</div>
				</div>
			</div>
		</div>

		<!-- 开始查询 -->
		<M-D-Button :font="style" :str="str" @btn-click="btnClick"></M-D-Button>

		<!-- <loading v-model="isLoading"></loading> -->

		<!-- 百度地图 -->
		<div id="getMyPos"></div>

		<!-- 热门城市等 -->
		<city-air
		:show="isShowHotelCityBox"
		:city-list="getHotelCity"
		:active-city="activeCity"
		:city-query="getHotelCityInput"
		@getCity="selectCity"
		@search-key="inputGetCityId"
		></city-air>
	</div>
</template>

<script>
import { MDButton, CityAir } from '../components'
import { Loading, Group, Calendar, Cell, dateFormat   } from 'vux'
import { showTips } from '../components'
import configUrl from '../data/configUrl'
import { mapActions, mapGetters } from 'vuex'


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
			startDate: dateFormat(new Date(), 'YYYY-MM-DD'),				//	住店日期
			endDate: '',						//	离店日期
			endDate2: '',						//	离店可选择开始日期
			weeksList: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
			todayStr: {
				'TODAY':'今'
			},					//	替换今天日期为今
			highlightWeekend: true,						//	高亮周末
			dayTime: 24 * 60 * 60 * 1000,			//	一天的时间戳
			longitude: 116.404,			//	经度
			latitude: 39.915,				//	纬度
			isCanGetMyPos: true,     //	获取定位节流
			hotelCityName: '北京',					//	定位城市
			showCity: '北京',							//	展示城市
			hotelCityId: '824297',        //  酒店默认ID
			hotelCityInputUrl: configUrl.hotelCityInput.dataUrl,   //	酒店模糊查询URL
			hotelCityUrl: configUrl.hotelCity.dataUrl,   //	酒店城市查询URL
			isShowHotelCityBox: false,     								//	酒店城市是否显示
			activeCity: {
				cityName: '北京'
			}
		}
	},

	created () {
		//	设置title
		document.title = '酒店'
		//	初始化结束日期
		this.endDate = dateFormat(new Date(+new Date(this.startDate) + this.dayTime), 'YYYY-MM-DD')

		//	初始化查询热门城市
		let opt = {
			type: 'get',
			url: this.hotelCityUrl,
			errMsg: '查询城市失败'
		}

		this.hotelCity(opt)
	},

	mounted () {
		document.body.style.background = '#eee'
	},

	components: {
		MDButton,
		Loading,
		Group,
		Calendar,
		Cell,
		showTips,
		CityAir
	},

	methods: {
		//	开始查询
		btnClick () {
			this.$router.push({
				name: 'hotellist',
				query: {
					cityName: this.hotelCityName,
					cityId: this.hotelCityId,
					startDate: this.startDate,
					endDate: this.endDate
				}
			})
		},

		//选择住店日期
		selectStartDate: function (val) {
			//console.log(val)
			this.startDate = val
			let startDate = +new Date(this.startDate)
			let endDate = +new Date(this.endDate)
			let endDate2 = dateFormat(new Date(startDate + this.dayTime), 'YYYY-MM-DD')
			
			this.endDate2 = endDate2
			//	住店日期大于离店日期
			if (startDate >= endDate) {
				this.endDate = endDate2
			}
		},

		//	离店日期
		selectEndDate (val) {
			//console.log('离店日期：' + val)
			if (+new Date(val) < +new Date(this.endDate2)) {
				val = this.endDate2
			}

			this.endDate = val
		},

		//	获取我的位置 城市
		getMyPosCity () {
			if (!this.isCanGetMyPos) {
				this.isCanGetMyPos = false
				return
			}
			
			this.showCity = '正在定位'
			this.getMyCurrentPos()
		},

		//	百度地图获取城市
    getMyCurrentPos () {
    	this.$nextTick(function () {
				this.loadBMPScript()
			})
    },

    //	动态插入地图script
    loadBMPScript () {
    	let self = this
  		var script = document.querySelector('#getMap')
  		if (!script) {
  			script = document.createElement("script")
  			script.type = "text/javascript"
  			script.src = "http://api.map.baidu.com/api?v=2.0&ak=QfPA2I3xDcMBoGFmpcKxbWHz&callback=init"
  			script.id = 'getMap'
  			document.body.appendChild(script);

  			script.onload = function () {
  				setTimeout(function () {
  					self.initBMP()
  				}, 1500)
  			}
  		}
  		else {
  			this.initBMP ()
  		}
  	},

  	//	初始化百度地图
  	initBMP () {
  		let self = this
			var map = new BMap.Map("getMyPos")
			var geolocation = new BMap.Geolocation()

			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
							var geoc = new BMap.Geocoder(); 
							geoc.getLocation(r.point, function (res) {
								var  gpsAddress = res.addressComponents
								self.hotelCityName = gpsAddress.city.replace('市', '')
								console.log(self.hotelCityName)
								self.showCity = gpsAddress.city

								self.isCanGetMyPos = true

								//	根据城市查ID
								self.inputGetCityId(self.hotelCityName, true)
								
							})
						}
						else {
							alert('failed'+this.getStatus());
							self.isCanGetMyPos = true
						}
			}, {enableHighAccuracy: true})
  	},

  	//	模糊匹配查询城市ID
  	inputGetCityId (name, isGetPos) {
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

  		this.hotelCityInput(opt).then(function (res) {
  			//	是浏览器定位才重新给hotelCityId赋值
  			if (isGetPos) {
  				self.hotelCityId = res[0][0]
  			}
  		})
  		.catch(function (err) {
  			console.log(err)
  		})
  	},

  	//	vuex actions
  	...mapActions([ 'hotelCityInput', 'hotelCity' ]),


  	// 点击选择城市
  	ShowSelectCityBox () {
  		this.isShowHotelCityBox = true
  	},

  	//	选择城市
  	selectCity (city) {
  		this.hotelCityName = city.name || city[1]
  		this.hotelCityId = city.id || city[0]
  		this.showCity = this.hotelCityName
  		this.isShowHotelCityBox = false
  		this.activeCity.cityName = this.showCity 
  		//console.log(this.hotelCityName)
  		//console.log(this.hotelCityId)
  	}
  	
	},

	computed: {
		...mapGetters(['getHotelCity', 'getHotelCityInput'])
	}
}
</script>


<style lang="less">
.hotel_search_container{
	.hotel_search_wrapper {
		padding: .2rem;
	}

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
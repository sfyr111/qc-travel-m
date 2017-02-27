<template>
	<div class="hotel_search_container">
		<!-- 位置 -->
		<!-- 获取我的位置 -->
		<div  class="hotel_search_main" @click="getMyPosCity">
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
						{{ myPosCity }}
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
			      :render-month="[endDate2.split('-')[0], endDate2.split('-')[1]]"
			      @on-change="selectEndDate"
			      ></calendar>
			    </group>
				</div>
			</div>
		</div>

		<!-- 开始查询 -->
		<M-D-Button :font="style" :str="str" @btn-click="btnClick"></M-D-Button>

		<!-- <loading v-model="isLoading"></loading> -->

		<!-- 百度地图 -->
		<div id="getMyPos"></div>
	</div>
</template>

<script>
import { MDButton } from '../components'
import { Loading, Group, Calendar, Cell, dateFormat   } from 'vux'
import { showTips } from '../components'


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
			isFirstGetMyPos: true,             // 	第一次获取我的位置
			longitude: 116.404,			//	经度
			latitude: 39.915,				//	纬度
			isCanGetMyPos: true,     //	获取定位节流
			myPosCity: '北京'					//	定位城市
		}
	},

	created () {
		//	设置title
		document.title = '酒店'
		//	初始化结束日期
		this.endDate = dateFormat(new Date(+new Date(this.startDate) + this.dayTime), 'YYYY-MM-DD')
	},

	components: {
		MDButton,
		Loading,
		Group,
		Calendar,
		Cell,
		showTips
	},

	methods: {
		//	开始查询
		btnClick () {
			this.$router.push({
				name: 'hotellist',
				query: {
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
			if (this.isFirstGetMyPos) {
				showTips('打开GPS定位会更快', 2500)
				this.isFirstGetMyPos = false
			}

			if (!this.isCanGetMyPos) {
				this.isCanGetMyPos = false
				return
			}
			
			this.myPosCity = '正在定位'
			this.getLatAndLon()
		},

		//	html5 获取经纬度
		getLatAndLon () {
			let self = this
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function (pos) {
					self.getMyPosSuccess(pos)
				}, function (err) {
					self.getMyPosErr(err)
				})
			}
			else {
				this.isCanGetMyPos = true
				 alert( '您当前使用的浏览器不支持Geolocation服务' ); 
			}
		},

    //	定位成功回调
    getMyPosSuccess (pos) {
    	this.latitude = pos.coords.latitude
    	this.longitude = pos.coords.longitude
    	this.isCanGetMyPos = true

    	let self = this
    	function loadJScript () {
    		var script = document.querySelector('#getMap')
    		if (!script) {
    			script = document.createElement("script")
    			script.type = "text/javascript"
    			script.src = "http://api.map.baidu.com/api?v=2.0&ak=QfPA2I3xDcMBoGFmpcKxbWHz&callback=init"
    			script.id = 'getMap'
    			document.body.appendChild(script);

    			script.onload = function () {
    				setTimeout(function () {
    					init()
    				}, 1500)
    			}
    		} else {
    			console.log(script)
    			init ()
    		}
    		
    	}
    	function init () {
    		//	谷歌坐标转百度
    		var map = new BMap.Map("getMyPos")
    		var ggPoint = new BMap.Point(self.longitude, self.latitude)
    		map.centerAndZoom(ggPoint, 12)

    		//	定位城市
    		var geoc = new BMap.Geocoder(); 
    		geoc.getLocation(ggPoint, function (res) {
    			console.log(res)
    			var  gpsAddress = res.addressComponents
    			self.myPosCity = gpsAddress.city
    		})
    	}

    	this.$nextTick(function () {
				loadJScript()
			})
    },

    //	定位失败回调
    getMyPosErr (err) {
    	this.isCanGetMyPos = true
    	switch(err.code) {  
	      case 0:  
	        alert("尝试获取您的位置信息时发生错误：" + err.message);  
	        break;  
	      case 1:  
	          alert("用户拒绝了获取位置信息请求。");  
	        break;  
	      case 2:  
	          alert("浏览器无法获取您的位置信息：" + err.message);  
	        break;  
	      case 3:  
	          alert("获取您位置信息超时。");  
	        break;  
      }
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
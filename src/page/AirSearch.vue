<template>
	<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div>
      <div class="a_box">
        <div class="row r_city">
          <span class="city" @click="showCityDepBox()">{{cityDep.cityName}}</span>
          <i class="icon" @click="replaceCity()"></i>
          <span class="city" @click="showCityArrBox()">{{cityArr.cityName}}</span>
        </div>
        <div class="row r_date clearfix">
          <div class="fl date">
            <span class="date_name">去程</span>
            <group class="fr date_time hotel_search_lay_str">
                <calendar
                  v-model="startDate"
                  title=""
                  disable-past
                  :weeks-list="weeksList"
                  :replace-text-list="todayStr"
                  :highlight-weekend="highlightWeekend"
                  @on-change="selectStartDate"
                ></calendar>
              </group>
          </div>
          <div class="fr date">
            <span class="date_name">返程</span>
            <group class="fr not_choose date_time hotel_search_lay_str">
                <calendar
                  v-model="endDate"
                  title=""
                  disable-past
                  :weeks-list="weeksList"
                  :start-date="endDate2"
                  :highlight-weekend="highlightWeekend"
                  @on-change="selectEndDate"
                ></calendar>
              </group>
          </div>
        </div>
        <!-- 开始查询 -->
        <M-D-Button :font="style" :str="str" @btn-click="btnClick"></M-D-Button>

      </div>
      <!-- 加载城市组件 -->
      <city-air
        :show="showCityDep"
        :city-list="cityAirList"
        :active-city="cityDep"
        :city-query="cityQueryList"
        @getCity="getCityDep"
        @search-key="cityQuery"></city-air>
      <city-air
        :show="showCityArr"
        :city-list="cityAirList"
        :active-city="cityArr"
        :city-query="cityQueryList"
        @getCity="getCityArr"
        @search-key="cityQuery"></city-air>
    </div>
	</transition>
</template>
<script>
	import { MDButton, CityAir } from '../components'
	import { Loading, Group, Calendar, dateFormat } from 'vux'
	import { mapGetters } from 'vuex'
  import configUrl from '../data/configUrl'
	export default {
		data () {
			return {
				style: {
					width: '4.6rem',
					height: '.8rem',
					'font-size': '.32rem',
					'color': '#fff',
					background: '#e30b20',
					'margin': '.5rem auto 0 auto',
					display: 'block',
					'border-radius': '.1rem'
				},									//	按钮样式
				str: '搜索机票',		//	按钮内容
				startDate: dateFormat(new Date(), 'YYYY-MM-DD'),				//	住店日期
				endDate: '',						//	离店日期
        endDate2: '',
        showCityDep: false,     // 城市筛选组件
        showCityArr: false,     // 城市筛选组件
        cityDep: {
          cityName: '北京'
        },
        cityArr: {
          cityName: '上海'
        },
        weeksList: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        todayStr: {
          'TODAY':'今'
        },					//	替换今天日期为今
        highlightWeekend: true,						//	高亮周末
        dayTime: 24 * 60 * 60 * 1000,			//	一天的时间戳
			}
		},
		computed: {
		    ...mapGetters({
          cityAirList: 'getCityAirList',
          cityQueryList: 'getCityQuery'
		    }),
		},
		components: {
			MDButton,
			Loading,
			Group,
      CityAir,
			Calendar
		},
		methods: {
			// 查询
			btnClick () {
        this.$router.push({
        	name: 'airList',
          query: {
            startDate: this.startDate,
            endDate: this.endDate,
            arrCity: this.cityArr.cityName,
            depCity: this.cityDep.cityName,
          }
        })
			},

      showCityDepBox () {
				this.showCityDep = true
        let opt = {
					url: configUrl.cityAir.dataUrl,
          type: 'get',
        }
        this.$store.dispatch('cityAirList', opt).then(function (resp) {
          console.log(resp)
        })
      },
      getCityDep (city) {
        this.cityDep.cityName = city.cityCn
        this.showCityDep = false
      },
      showCityArrBox () {
        this.showCityArr = true
        let opt = {
          url: configUrl.cityAir.dataUrl,
          type: 'get',
        }
        this.$store.dispatch('cityAirList', opt).then(function (resp) {
          console.log(resp)
        })
      },
      getCityArr (city) {
        this.cityArr.cityName = city.cityCn
        this.showCityArr = false
      },
      cityQuery (key) {
				let opt = {
					url: configUrl.cityAirKey.dataUrl,
          type: 'get',
          data: {
						name: key
          }
        }
        this.$store.dispatch('cityQuery', opt).then(function (resp) {
          console.log(resp)
        })
      },
      // 交换城市
      replaceCity () {
				if (this.cityDep && this.cityDep.cityName && this.cityArr && this.cityArr.cityName) {
					let temp = null;
          temp = this.cityDep.cityName
          this.cityDep.cityName = this.cityArr.cityName
          this.cityArr.cityName = temp
        } else {
					return
        }
      },
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
      //	返程日期
      selectEndDate (val) {
        //console.log('返程日期：' + val)
        if (+new Date(val) < +new Date(this.endDate2)) {
          val = this.endDate2
        }

        this.endDate = val
      },
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
        display: inline-block;
        width: .5rem;
        height: .5rem;
        vertical-align: -.1rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 24px;
				background-image: url("../assets/images/single2return.png");
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

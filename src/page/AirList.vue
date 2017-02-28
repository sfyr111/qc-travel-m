<template>
  <div>

    <air-list-head
    :date="dateStr"
    @select-date="setDate"
    :city-dep="cityDep"
    :city-arr="cityArr"></air-list-head>

    <air-list-table
      @order-single="orderSingle"
      @order-go="orderGo"
      @order-return="orderReturn"
      @load-more="loadMore"
      @show-tip="showTipData"
      :trip-list="airList"
      :is-single="isSingle"
      :has-check="hasCheck"></air-list-table>

    <air-list-foot @sort-type="sort" :table-index="tableIndex"></air-list-foot>
    
    <tip-change 
      :show="showTip" 
      :ticket-turn="ticketTurn"
      :ticket-change="ticketChange"
      :ticket-back="ticketBack"
      @hide-tip="hideTip"></tip-change>
  </div>
</template>
<script>
  import http from '../api/http'
  import { AirListHead, AirListTable, AirListFoot, TipChange } from '../components'
  import configUrl from '../data/configUrl'
  import { mapGetters } from 'vuex'
  export default {
  	computed: {
      ...mapGetters({
        airList: 'getAirList'
      }),
      isSingle () {
      	if (this.tripType == 'RT') {
      		return false
        }
        return true
      },
      dateStr () {
        if (this.tripType == 'OW') {
          return this.startDate
        }
        if (this.tripType == 'RT' && !this.hasCheck) {
          return this.startDate
        }
        if (this.tripType == 'RT' && this.hasCheck) {
          return this.endDate
        }
      }
    },
  	components: {
      AirListHead,
      AirListTable,
      AirListFoot,
      TipChange
    },
    created: function() {
      this.initQuery=true
      // 初始化筛选数据
      this.searchTrip()
    },
    data () {
      return {
        sourceId: '',
        startDate: this.$route.query.startDate,
        endDate: this.$route.query.endDate,
        cityDep: this.$route.query.depCity,
        cityArr: this.$route.query.arrCity,
        tripType: this.$route.query.endDate ? 'RT' : 'OW',
        hasCheck: false,      // 是否选定去程
        sortType: '1',   // 排序
        pageNo: 1,
        pageSize: 10,
        tableIndex: 0,
        showTip: false,
        ticketTurn: '',
        ticketChange: '',
        ticketBack: '',
        initQuery: true,
      }
    },
    methods: {
      setDate (val) {
        if (this.isSingle) {
        	if (this.startDate === val) {
        		return
          }
          this.startDate = val
        }
        if (!this.isSingle && !this.hasCheck) {
        	if (this.startDate === val) {
        		return
          }
          this.startDate = val
        }
        if (!this.isSingle && this.hasCheck) {
        	if (this.endDate === val) {
        		return
          }
          this.endDate = val
        }
        this.tableIndex = 0
        this.initQuery=true
        // 更改时间重新筛选数据
        this.searchTrip()
      },
      loadMore () {
      	this.pageNo=parseInt(this.pageNo)+1
        this.tableIndex = 0
        this.initQuery=false
        // 滚动到底部加载更多
        this.searchTrip()
      },
      sort (num) {
      	this.sortType = num
        this.tableIndex = num
        this.initQuery=true
        // 滚动到底部加载更多
        this.searchTrip()
      },
      searchTrip () {
      	let data = {
          sourceId: this.sourceId || "",
          arrCity: this.cityArr,
          arrDate: this.endDate,
          depCity: this.cityDep,
          depDate: this.startDate,
          sortType: this.sortType,
          pageSize: this.pageSize,
          pageNo: this.pageNo
        }
      	let opt = {
      		url: configUrl.airList.dataUrl,
          data: data,
          type: 'post',
          initQuery: this.initQuery
        }
        this.$store.dispatch('airList', opt).then(function (resp) {
        })
      },
      // 单程
      orderSingle (Pindex, index) {
        sessionStorage.clear()
        let model = this.setModel(Pindex, index)

        sessionStorage.setItem('model', '['+JSON.stringify(model)+']')

        this.sourceId = this.airList[Pindex].bingoClassInfos[index].sourceId
//        this.$router.go({
//          name: 'airOrder',
//          query: {
//            sourceId: this.sourceId
//          }
//        })
      },
      // 选去程
      orderGo (Pindex, index) {
        this.hasCheck = true
        sessionStorage.clear()

        let model = this.setModel(Pindex, index)
        sessionStorage.setItem('model', '['+JSON.stringify(model)+']')

        this.sourceId = this.airList[Pindex].bingoClassInfos[index].sourceId

        let temp = this.cityDep
        this.cityDep = this.cityArr
        this.cityArr = temp
        this.tableIndex = 0
        console.log('rechoose')
        this.initQuery=true
        // 重新搜索
        this.searchTrip()
      },
      // 选返程
      orderReturn (Pindex, index) {
        let trip = JSON.parse(sessionStorage.getItem('model'))
        let self = this
        trip.push(this.setModel(Pindex, index))

        sessionStorage.setItem('model', JSON.stringify(trip))
//        this.$router.go({
//          name: 'airOrder',
//          query: {
//            sourceId: self.sourceId
//          }
//        })
      },
      showTipData (Pindex, index) {
        let _this = this
        let data = {
          sourceId: this.airList[Pindex].bingoClassInfos[index].sourceId,
          airways: this.airList[Pindex].airways,
          depCity: this.airList[Pindex].depCity,
          arrCity: this.airList[Pindex].arrCity,
          beginDate: this.airList[Pindex].depDate,
          fareItemId: this.airList[Pindex].bingoClassInfos[index].fareItemId,
          classNO: this.airList[Pindex].bingoClassInfos[index].classNo
        }
        new Promise(function ( resolve, reject ) {
          http.fetch(configUrl.airChange.dataUrl, {
            loading: true,
            data: data,
            type: 'post',
          })
          .then(res => {
            if (res.body.success) {
              _this.ticketTurn = res.body.result.ticketTurn
              _this.ticketChange = res.body.result.ticketChange
              _this.ticketBack = res.body.result.ticketBack
              _this.showTip = true
              resolve(res.body)
            }
            if (!res.body.success) {
              reject(res.body)
            }
          })
        });
      },
      hideTip () {
        this.showTip = false
      },
      // 数据处理
      setModel: function (Pindex, index) {
        let model = {}
        model.airways=this.airList[Pindex].airways								 // 航空公司代码

        model.airwaysCn=this.airList[Pindex].airwaysCn									 // 航空公司名称

        model.arrCityCode=this.airList[Pindex].arrCity							 // 到达城市代码

        model.arrTerminal=this.airList[Pindex].arrTerminal									 // 到达城市航站楼

        model.arrCityName=this.cityArr								 // 到达城市中文名

        model.arrdate=this.airList[Pindex].arrDate									 // 到达日期

        model.arrival=this.airList[Pindex].arrCity									 // 到达机场三字码

        model.arrtime=this.airList[Pindex].arrTime									 // 到达时间

        model.arrairdrome=this.airList[Pindex].arrAirdrome									 // 到达城市机场

        model.buildfee=this.airList[Pindex].tax									 // 机场建设费

        model.childOilTax=this.airList[Pindex].bingoClassInfos[index].childOilTax									 // 儿童燃油税

        model.childSalePrice=this.airList[Pindex].bingoClassInfos[index].childSalePrice									 // 京东儿童销售价格

        model.childSeatCode=this.airList[Pindex].bingoClassInfos[index].childSeatCode									 // 深航儿童仓位 ,如果不传会导致无法出票

        model.childVenderPrice=this.airList[Pindex].bingoClassInfos[index].childVenderPrice									 // 商家儿童成本价格

        model.commisionPoint=''									 // 政策反点

        model.depCityCode=this.airList[Pindex].depCity									 // 出发城市代码

        model.depCityName=this.cityDep									 // 出发城市中文名

        model.depTerminal=this.airList[Pindex].depTerminal									 // 出发城市航站楼

        model.depairdrome=this.airList[Pindex].depAirdrome									 // 出发城市机场

        model.departure=this.airList[Pindex].depCity									 // 出发机场三字码

        model.depdate=this.airList[Pindex].depDate									 // 出发日期

        model.deptime=this.airList[Pindex].depTime									 // 起飞时间

        model.discount=this.airList[Pindex].bingoClassInfos[index].discount									 // 折扣

        model.discountId=''									 // 直降政策

        model.planeStyle=this.airList[Pindex].planeStyle
        model.fareitemid=this.airList[Pindex].bingoClassInfos[index].fareItemId									 // 特价id

        model.flightNo=this.airList[Pindex].flightNo									 // 航班号

        model.fullPrice=this.airList[Pindex].bingoClassInfos[index].fullPrice									 // Y舱价格

        model.iOilTax=this.airList[Pindex].bingoClassInfos[index].childOilTax									 // 婴儿燃油税，默认填0

        model.isStop=this.airList[Pindex].bingoClassInfos[index].isStop									 // 是否经停1、是，0、否

        model.originalPrice=this.airList[Pindex].bingoClassInfos[index].originalPrice									 // 原始票价

        model.oiltax=this.airList[Pindex].bingoClassInfos[index].oilTax									 // 燃油税

        model.policyId=this.airList[Pindex].bingoClassInfos[index].policyId									 // 政策id,

        model.price=this.airList[Pindex].bingoClassInfos[index].price									 // 购买票价

        model.promotionId=''									 // 促销Id

        model.saleDiscountType=this.airList[Pindex].bingoClassInfos[index].saleDiscountMap[0].entry.SaleDiscount.saleDiscountType									 // 促销类型， 1 直降， 2返券

        model.seatcodeCn=this.airList[Pindex].bingoClassInfos[index].classNoCn									 // 舱位
        model.seatcode=this.airList[Pindex].bingoClassInfos[index].classNo

        model.stopCity=''									 // 经停城市

        model.ticketBack=''									 // 退票规定

        model.ticketChange=''									 // 改签规定

        model.ticketTurn=''									 // 转签规定

        model.total=''									 // 单张合计为price+buildfee+ oiltax

        model.tripType=this.tripType									 // 行程标志 OW,单程。 RT往返

        model.venderPrice=this.airList[Pindex].bingoClassInfos[index].venderPrice									 // 商家成本价格

        return model
      },
    }
  }
</script>

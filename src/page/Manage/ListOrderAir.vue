<template>
    <div class="management-air-order-content" v-scroll-bottom="{throttle: 400, distance: 10, loadMore: loadMore}">
        <div class="air-order-information color_66" v-for="air in listOrderAir" @click="toAirDetail(air.orderNo)">
          <p class="air-company">
            <span>{{air.trips[0].airwaysCn}}</span>
            <span>{{air.trips[0].flightNo}}</span>
            <!--<i>|</i>-->
            <!--<span>经济舱</span>-->
          </p>
          <div class="air-destination">
            <span class="color_33">{{air.trips[0].depCityName}}</span>
            <i v-if="air.trips[0].tripType == 'RT'" class="icon iconfont icon-iconfonteg"></i>
            <i v-if="air.trips[0].tripType == 'OW'" class="icon iconfont icon-jiantou1"></i>
            <span class="color_33">{{air.trips[0].arrCityName}}</span>
          </div>
          <div class="air-time clearfix border border-bottom">
            <div class="fl">
              <p>{{air.trips[0].depdate}}&nbsp;{{air.trips[0].deptime.substring(0,2)+':'+air.trips[0].deptime.substring(2,4)}}</p>
              <p>宝安机场</p>
            </div>
            <div class="fr">
              <p>{{air.trips[0].arrdate}}&nbsp;{{air.trips[0].arrtime.substring(0,2)+':'+air.trips[0].arrtime.substring(2,4)}}</p>
              <p>首都机场T3</p>
            </div>
          </div>
          <div class="air-price clearfix">
            <div class="fl"><span>￥{{air.trips[0].total}}</span>共<em>1</em>人</div>
            <div class="fr">{{air.tradingStatus === 0 ? "订单提交成功" :
              air.tradingStatus === 1 ? "等待付款" :
                air.tradingStatus === 2 ? "出票中" :
                  air.tradingStatus === 3 ? "下单失败" :
                    air.tradingStatus === 4 ? "出票成功" :
                      air.tradingStatus === 5 ? "已取消" : ""}}</div>
          </div>
        </div>
    </div>
</template>

<script>
  import ScrollBottom from '../../directives/ScrollBottom'
  import configUrl from '../../data/configUrl'
  import { mapGetters } from 'vuex'
    export default {
        directives: {
            ScrollBottom
        },
        created () {
          this.initList(true)
        },
        computed: {
          ...mapGetters({
            listOrderAir: 'getListOrderAir'
          }),
        },
        data () {
        	return {
            page: 0,
            pageSize: 10
          }
        },
        methods: {
        	  initList (initQuery) {
                let opt = {
                  url: configUrl.listOrderAir.dataUrl,
                  type: 'get',
                  initQuery: initQuery,
                  data: {
                    page: this.page,
                    pageSize: this.pageSize
                  }
                };
                this.$store.dispatch('listOrderAir', opt)
            },
            // 跳转到机票详情页面
            toAirDetail(orderNo){
                this.$router.push({
                  path: 'detailAir',
                  query: { orderNo: orderNo }
                })
            },
            loadMore () {
              this.page=parseInt(this.page)+1
              this.initList()
            },
        }
    }
</script>

<style scoped>
    .management-air-order-content{
        padding:.2rem;
    }
    .air-order-information{
      background: #fff;
      width: 100%;
      border-radius: .1rem;
      font-size: .3rem;
      margin-bottom: .2rem;
    }
    .air-order-information .air-company{
      padding:.25rem .3rem;
    }
    .air-order-information .air-destination{
      text-align: center;
      padding:.15rem .4rem;
      font-size: .4rem;
    }
    .air-order-information .air-destination i{
      padding:0 .25rem;
    }
    .air-order-information .air-time{
      margin:0 .4rem;
    }
    .air-order-information .air-time div.fl{
      width: 45%;
      text-align: right;
      padding-bottom: .3rem;
    }
    .air-order-information .air-time div.fr{
      width: 45%;
      text-align: left;
      padding-bottom: .3rem;
    }
    .air-order-information .air-price{
      padding:.15rem .3rem;
    }
    .air-order-information .air-price div.fl{
      line-height: .6rem;
    }
    .air-order-information .air-price div.fl span{
      font-weight: bold;
      color:#e30b22;
      padding-right: .1rem;
    }
    .air-order-information .air-price div.fr{
      padding:.1rem .2rem;
      background: #eeeeee;
      border-radius: .3rem;
    }
</style>

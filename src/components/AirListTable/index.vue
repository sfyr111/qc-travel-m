<template>
  <div class="air_table_box" v-scroll-bottom="{throttle: 400, distance: 100, loadMore: loadMore}">
    <div class="air_main" v-for="(air, parentIndex) in tripList">
      <table class="air_main_table" @click="showThisPannel(parentIndex)">
        <tr class="air_main_table_up">
          <td class="time_airport">
            <span class="time">{{air.depTime.substring(0,2)+':'+air.depTime.substring(2,4)}}</span>
            <span class="airport">{{air.depAirdrome}}{{air.depTerminal}}</span>
          </td>
          <td>
            <span class="arrow"></span>
          </td>
          <td class="time_airport">
            <span class="time">{{air.arrTime.substring(0,2)+':'+air.arrTime.substring(2,4)}}</span>
            <span class="airport">{{air.arrAirdrome}}{{air.arrTerminal}}</span>
          </td>
          <td class="price_info">
            <em>￥</em>
            <span class="price">{{air.bingoClassInfos | getMin}}</span>
            <span class="price_info_text">起</span>
          </td>
          <td>
            <i v-show="!air.showPannel" class="icon iconfont icon-xia"></i>
            <i v-show="air.showPannel" class="icon iconfont icon-shang"></i>
          </td>
        </tr>
        <tr class="air_main_table_down">
          <td colspan="5">
            <img class="air_img" :src="imgPrifx+air.airways+'.png'" alt="">
            <span class="air_no">{{air.airwaysCn}}{{air.flightNo}}</span>
            <span>&nbsp;|&nbsp;</span>
            <span class="air_text">{{air.planeStyleCN || "其他机型"}}{{air.planeStyle}}</span>
          </td>
        </tr>
      </table>
      <div class="air_sub_table" v-show="air.showPannel" v-if="air.bingoClassInfos.length > 0">
        <table>
          <tr v-for="(FlightClassInfo, index) in air.bingoClassInfos">
            <td class="air_seat">
              <span>{{FlightClassInfo.classNoCn}}</span>
              <span class="air_change_info" @click="showTip(parentIndex, index)">退改签></span>
            </td>
            <td class="air_price">
              <em>￥</em>
              <span>{{FlightClassInfo.price}}</span>
            </td>
            <td class="btn_group">
              <button v-if="isSingle" @click="orderSingle(parentIndex, index)">预订</button>
              <button v-if="!isSingle && !hasCheck" @click="orderGo(parentIndex, index)">选去程</button>
              <button v-if="!isSingle && hasCheck" @click="orderReturn(parentIndex, index)">选返程</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .air_table_box {
    margin-top: 1.62rem;
    width: 100%;
    min-height: 100%;
    .air_main {
      border-bottom: 1px solid #dddddd;
      .air_main_table {
        background-color: #ffffff;
        padding: 0 .24rem 0 .34rem;
        width: 100%;
        .air_main_table_up td {
          padding-top: .36rem;
          height: .70rem;
        }
        .air_main_table_down td {
          font-size: .26rem;
          color: #656565;
          height: .60rem;
          .air_img {
            display: inline-block;
            width: .24rem;
            height: .24rem;
            /*vertical-align: middle;*/
          }
        }
        .time_airport {
          text-align: center;
          .time,.airport {
            display: block;
          }
          .time {
            font-size: .36rem;
            color: #333333;
          }
          .airport {
            font-size: .28rem;
          }
        }
        .arrow {
          display: block;
          background-position: right;
          background-repeat: no-repeat;
          background-size: 1.8rem;
          margin: 0 auto;
          height: inherit;
          width: 1.00rem;
          padding: 0;
          background-image: url("../../assets/images/arrow_right.png")
        }
        .price_info {
          text-align: right;
          em {
            color: #e30b20;
          }
          .price {
            font-size: .4rem;
            color: #e30b20;
          }
          .price_info_text {
            font-size: .2rem;
          }
        }
        .icon-xia,.icon-shang {
          vertical-align: -.30rem;
          font-size: .4rem;
        }
      }
      .air_sub_table {
        background-color: #f1f1f1;
        padding: 0 .16rem;
        table {
          width: 100%;
          tr {
            td {
              height: 1.20rem;
              border-bottom: 1px dashed #dddddd;
            }
            .air_seat {
              text-align: left;
              padding-left: .3rem;
              span {
                display: block;
              }
              .air_change_info {
                color: #33a9fb;
              }
            }
            .air_price {
              width: 3.00rem;
              text-align: right;
              color: #e30b20;
              em {
               font-size: .20rem;
              }
              span {
                font-size: .30rem;
              }
            }
            .btn_group {
              text-align: right;
              padding-right: .2rem;
              button {
                padding: .10rem .20rem;
                border-radius: 3px;
                color: #ffffff;
                background-color: #e30b20;
              }
            }
          }
          tr:last-child {
            td {
              border-bottom: none;
            }
          }
        }
      }
    }
  }
</style>
<script>
  import getMin from '../../filters/getMin'
  import configUrl from '../../data/configUrl'
  import ScrollBottom from '../../directives/ScrollBottom'
  export default {
    directives: {
      ScrollBottom
    },
  	props: {
  		tripList: {
  			type: Array
      },
      isSingle: {
  			type: Boolean,
        default: true
      },
      hasCheck: {
        type: Boolean,
        default: true
      }
    },
    data () {
  		return {
      }
    },
    filters: {
      getMin
    },
    computed: {
      imgPrifx () {
      	return configUrl.imgPath
      }
    },
    methods: {
      showThisPannel (index) {
        this.tripList[index].showPannel = !this.tripList[index].showPannel;
      },
      orderSingle (Pindex, index) {
        this.$emit('order-single', Pindex, index)
      },
      orderGo (Pindex, index) {
        this.$emit('order-go', Pindex, index)
      },
      orderReturn (Pindex, index) {
        this.$emit('order-return', Pindex, index)
      },
      loadMore () {
        this.$emit('load-more')
      },
      showTip (Pindex, index) {
        this.$emit('show-tip', Pindex, index)
      }
    }
  }
</script>

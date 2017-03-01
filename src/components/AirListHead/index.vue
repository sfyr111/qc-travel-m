<template>
  <div class="air_head_box">
    <div class="trip">
      <span>{{cityDep}}</span>
      <i class="icon iconfont icon-jiantou1"></i>
      <span>{{cityArr}}</span>
    </div>
    <div class="week">
      <span class="go_prev" :class="{ 'disabled' : isDisabled }" @click="goPrev()"><i class="icon iconfont icon-xiangzuojiantou"></i>前一天</span>
      <div class="date">
        <i class="icon iconfont icon-rili1"></i>
        <group class="air_search_str date_time">
          <calendar
            v-model="dataStr"
            title=""
            disable-past
            :weeks-list="weeksList"
            @on-change="selectDate"
          ></calendar>
        </group>
      </div>
      <span class="go_next" @click.stop="goNext()">后一天<i class="icon iconfont icon-xiangyoujiantou"></i></span>
    </div>
  </div>
</template>
<style scoped>
  .air_head_box {
    position: fixed;
    top: 0;
    height: 1.62rem;
    z-index: 999;
  }
  .trip {
    width: 100%;
    height: .80rem;
    text-align: center;
    font-size: .3rem;
    line-height: .80rem;
    color: #ffffff;
    background-color: #5ea6f5;
  }
  .week {
    display: flex;
    width: 100%;
    height: .80rem;
    line-height: .80rem;
    text-align: center;
    font-size: .30rem;
    border-bottom: 1px solid #dddddd;
  }
  .date {
    display: flex;
    width: 4.1rem;
    height: 100%;
    background-color: #eeeeee;
  }
  .date .icon {
    flex: 2;
    text-align: right;
    color: #999999;
    vertical-align: .24rem;
  }
  .date_time {
    flex: 3;
  }
  .date_time .weui-cells {
    background-color: #dddddd!important;
  }
  .date_time .weui-cell {
    margin-top: 0;
    height: inherit!important;;
  }
  .go_prev,.go_next {
    display: inline-block;
    height: 100%;
    width: 1.70rem;
    color: #333333;
    background-color: #dddddd;
  }
  .disabled {
    color: #999999;
  }
  .icon {
    vertical-align: middle;
  }
</style>
<script>
  import { Group, Calendar, dateFormat } from 'vux'
  export default {
    props: {
      date: {
        type: String
      },
      cityDep: {
        type: String
      },
      cityArr: {
        type: String
      }
    },
  	components: {
      Group, Calendar
    },
    computed: {
      isDisabled () {
        if (this.date === dateFormat(new Date(), 'YYYY-MM-DD')) {
          return true
        } else {
          return false
        }
      },
      dataStr () {
        return this.date
      }
    },
    data () {
      return {
        weeksList: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        highlightWeekend: true,
      }
    },
    methods: {
      selectDate (val) {
        this.$emit('select-date', val)
      },
      goPrev () {
        if (this.isDisabled) {
          return
        }
        if (!this.isDisabled) {
          let time = dateFormat(new Date(+new Date(this.date) - 24 * 60 * 60 * 1000), 'YYYY-MM-DD')
          this.selectDate(time)
        }
      },
      goNext () {
        let time = dateFormat(new Date(+new Date(this.date) + 24 * 60 * 60 * 1000), 'YYYY-MM-DD')
        this.selectDate(time)
      }
    }
  }
</script>

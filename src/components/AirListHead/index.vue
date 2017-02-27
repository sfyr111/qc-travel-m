<template>
  <div>
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
            v-model="date"
            title=""
            disable-past
            :weeks-list="weeksList"
            @on-change="selectDate"
          ></calendar>
        </group>
      </div>
      <span class="go_next" @click="goNext()">后一天<i class="icon iconfont icon-xiangyoujiantou"></i></span>
    </div>
  </div>
</template>
<style scoped>
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
    display: inline-block;
    width: 4.1rem;
    height: 100%;
    background-color: #eeeeee;
  }
  .date .icon {
    color: #999999;
    display: inline-block;
    vertical-align: .24rem;
  }
  .date_time {
    display: inline-block;
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
          this.$emit('select-date', time)
        }
      },
      goNext () {
        let time = dateFormat(new Date(+new Date(this.date) + 24 * 60 * 60 * 1000), 'YYYY-MM-DD')
        this.$emit('select-date', time)
      }
    }
  }
</script>

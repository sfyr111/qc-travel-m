<template>
  <div>
    <div class="trip">
      <span>上海</span>
      <i class="icon iconfont icon-jiantou1"></i>
      <span>北京</span>
    </div>
    <div class="week">
      <span class="go_prev">前一天</span>
      <div class="date"></div>
      <span class="go_next">后一天</span>
    </div>
  </div>
</template>
<style scoped>
  .trip {
    width: 100%;
    height: .50rem;
    text-align: center;
    font-size: .3rem;
    line-height: .5rem;
    color: #ffffff;
    background-color: #5ea6f5;
  }
  .week {
    width: 100%;
    height: .80rem;
    line-height: .80rem;
    text-align: center;
    border-bottom: 1px solid #dddddd;
  }
  .date {
    display: inline-block;
    width: 4.1rem;
    height: 100%;
    background-color: #eeeeee;
  }
  .go_prev,.go_next {
    display: inline-block;
    height: 100%;
    width: 1.70rem;
    color: #999999;
    background-color: #dddddd;
  }
</style>
<script>
  import { Group, Calendar } from 'vux'
  export default {
  	components: {
      Group, Calendar
    }
  }
</script>

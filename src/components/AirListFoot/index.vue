<template>
  <div class="air_foot_box">
    <ul>
      <li :class="{ 'acitve_nav' : tableIndex == 1 }" @click="sortBy(1)">
        <i class="fa fa-clock-o"></i>
        <span>时间</span>
      </li>
      <li :class="{ 'acitve_nav' : tableIndex == 2 }" class="nav_price" @click="sortBy(2)">
        <i class="fa fa-gg-circle"></i>
        <span>价格</span>
      </li>
    </ul>
  </div>
</template>
<style scoped>
  .air_foot_box {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: .90rem;
    background-color: #eeeeee;
    border-top: 1px solid #dddddd;
  }
  .air_foot_box ul {
    display: flex;
  }
  .air_foot_box ul li {
    width: 50%;
    line-height: .90rem;
    text-align: center;
    font-size: .3rem;
  }
  .air_foot_box ul li i {
    font-size: .3rem;
  }
  .acitve_nav {
    color: #ffffff;
    background-color: #434242;
  }
  .nav_price {
    border-left: 1px solid #dfdfdf;
  }
</style>
<script>
  export default {
  	props: {
      tableIndex: {
      	type: Number
      }
    },
    methods: {
      sortBy (num) {
        this.$emit('sort-type', num)
      }
    }
  }
</script>

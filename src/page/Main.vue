<template>
  <div>
    <router-link tag="a" to="/airsearch" class="main_link to_air"><span class="btn_white">机票预订</span></router-link>
    <router-link tag="a" to="/hotelsearch" class="main_link to_hotel"><span class="btn_white">酒店预订</span></router-link>
  </div>
</template>
<style>
  @import url('../css/reset.css');
  @import url('../css/common.css');
  @import url('../css/animate.css');
  @import url('../css/lib/iconfont/iconfont.css');
  .main_link {
    display: block;
    margin: .22rem auto 0px;
    text-align: center;
    border-radius: 6px;
    width: 6.92rem;
    height: 2.30rem;
  }
  .to_air {
    background-color: #479af3;
  }
  .to_hotel {
    background-color: #ff7572;
  }
  .btn_white {
    line-height: 2.30rem;
    padding: 0.24rem 0.32rem;
    border: 1px solid #fff;
    border-radius: 4px;
    color: #fff;
  }
</style>

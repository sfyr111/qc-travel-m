<template>
  <div>
    <router-link tag="a" to="/airsearch" class="main_link to_air"><span class="btn_white">机票预订</span></router-link>
    <router-link tag="a" to="/hotelsearch" class="main_link to_hotel"><span class="btn_white">酒店预订</span></router-link>
    <div class="bottom-tab clearfix">
        <router-link tag="a" to="/" class="tab tab1 fl bsizing">
            <i class="icon iconfont">&#xe6e9;</i>
            <span class="color_66">首页</span>
        </router-link>
        <router-link tag="a" to="/manageCenter" class="tab tab2 fr">
            <i class="fa fa-th-large"></i>
            <span class="color_66">管理中心</span>
        </router-link>
    </div>
  </div>

</template>
<style>
  @import url('../css/reset.css');
  @import url('../css/common.css');
  @import url('../css/animate.css');
  @import url('../css/lib/iconfont/iconfont.css');
  @import url('../css/font-awesome-4.7.0/css/font-awesome.min.css');
  .main_link {
    display: block;
    margin: .22rem auto 0px;
    text-align: center;
    border-radius: 6px;
    width: 6.92rem;
    height: 2.30rem;
  }
  .to_air {
    background-image: url("../assets/images/bg_air.png");
    background-position: center;
    background-repeat: no-repeat;
    background-color: #479af3;
  }
  .to_hotel {
    background-image: url("../assets/images/bg_hotel.png");
    background-position: center;
    background-repeat: no-repeat;
    background-color: #ff7572;
  }
  .btn_white {
    line-height: 2.30rem;
    padding: 0.24rem 0.32rem;
    border: 1px solid #fff;
    border-radius: 4px;
    color: #fff;
  }
  .bottom-tab{
    width: 100%;
    height: 1rem;
    background: #fff;
    position: fixed;
    bottom:0;
    left:0;
  }
  .bottom-tab .tab{
    display: block;
    width: 50%;
    height: 100%;
    text-align: center;
    font-size: .3rem;
    line-height: 1rem;
  }
  .bottom-tab .tab1{
    border-right: 1px solid #dddddd;
  }
  .bottom-tab .tab i{
    font-size: .5rem;
    color:#999;
  }
  .bottom-tab .tab:hover span,
  .bottom-tab .tab:hover i{
    color:#e50922;
  }
</style>

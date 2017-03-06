import Vue from 'vue'
import VueRouter from 'vue-router'
import page from './page'
import store from './vuex/store'
import Fastclick from 'fastclick'
import eruda from 'eruda'

// eruda.init()

/* eslint-disable no-new */
Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    component: page.Main
  },
  {
    path: '/list',
    component: page.List
  },
  //  酒店搜索
  {
    path: '/hotelsearch',
    component: page.HotelSearch
  },
  //  机票搜索
  {
    path: '/airsearch',
    component: page.AirSearch
  },
  //  机票列表
  {
    path: '/airList',
    component: page.AirList,
    name: 'airList'
  },
  //  机票订单
  {
    path: '/airOrder',
    component: page.AirOrder,
    name: 'airOrder'
  },
  //  机票乘客查询
  {
    path: '/passenagerList',
    component: page.PassenagerList,
    name: 'passenagerList'
  },
  //  机票乘客添加
  {
    path: '/passenagerModel',
    component: page.PassenagerModel,
    name: 'passenagerModel'
  },
  //  地址
  {
    path: '/addressModel',
    component: page.Address,
    name: 'addressModel'
  },
  //  酒店列表
  {
    path: '/hotellist',
    component: page.HotelList,
    name: 'hotellist'
  },
  //  酒店详情
  {
    path: '/hoteldetail',
    component: page.HotelDetail,
    name: 'hoteldetail'
  },
  //  酒店简介设施
  {
    path: '/hotelprofiletools',
    component: page.HotelProfileTools,
    name: 'hotelprofiletools'
  },
  //  酒店评论
  {
    path: '/hotelcomment',
    component: page.HotelComment,
    name: 'hotelcomment'
  },
  //  酒店地图
  {
    path: '/hotelmap',
    component: page.HotelMap,
    name: 'hotelmap'
  },
  //  管理中心
  {
    path: '/manageCenter',
    component: page.MangeCenter,
    name: 'manageCenter'
  },
  //  管理中心-机票订单
  {
    path: '/listOrderAir',
    component: page.ListOrderAir,
    name: 'listOrderAir'
  },
  //  管理中心-机票详情
  {
    path: '/detailAir',
    component: page.DetailAir,
    name: 'detailAir'
  },
  //  管理中心-酒店订单
  {
    path: '/listOrderHotel',
    component: page.ListOrderHotel,
    name: 'listOrderHotel'
  },
  //  管理中心-酒店详情
  {
    path: '/detailHotel',
    component: page.DetailHotel,
    name: 'detailHotel'
  }
]
const router = new VueRouter({
  routes: routes,
  // 页面跳转不记录滚动位置
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
// 添加loading动画
router.beforeEach(function (to, from, next) {
  store.commit('ISLOADING', true)
  next()
})
router.afterEach(function (to) {
  setTimeout(function () {
    store.commit('ISLOADING', false)
  }.bind(this), 1000)
})
new Vue({
  router,
  store
}).$mount('#app')

Fastclick.attach(document.body)


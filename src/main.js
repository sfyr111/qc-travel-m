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
  //  酒店列表
  {
    path: '/hotellist',
    component: page.HotelList,
    name: 'hotellist'
  },
  //  管理中心
  {
    path: '/managementcenter',
    component: page.ManagementCenter,
    name: 'managementcenter'
  },
  //  管理中心-机票订单
  {
    path: '/managementairorder',
    component: page.ManagementAirOrder,
    name: 'managementairorder'
  },
  //  管理中心-机票详情
  {
    path: '/managementairdetail',
    component: page.ManagementAirDetail,
    name: 'managementairdetail'
  },
  //  管理中心-酒店订单
  {
    path: '/managementhotelorder',
    component: page.ManagementHotelOrder,
    name: 'managementhotelorder'
  },
  //  管理中心-酒店详情
  {
    path: '/managementhoteldetail',
    component: page.ManagementHotelDetail,
    name: 'managementhoteldetail'
  }
]
const router = new VueRouter({
  routes: routes
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


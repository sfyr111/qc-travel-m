import Vue from 'vue'
import VueRouter from 'vue-router'
import page from './page'
import store from './vuex/store'
import Fastclick from 'fastclick'
import eruda from 'eruda'

//eruda.init()

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


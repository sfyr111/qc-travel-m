import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
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
    component: App
  },
  {
    path: '/list',
    component: page.List
  },
  //  酒店搜索
  {
    path: '/hotelsearch',
    component: page.HotelSearch
  }
]
const router = new VueRouter({
  routes: routes
})

new Vue({
  router,
  store
}).$mount('#app')

Fastclick.attach(document.body)


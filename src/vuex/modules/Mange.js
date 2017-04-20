import http from '../../api/http'
import * as types from '../mutation-types.js'

const state = {
  listOrderAir: [],
  orderAirDetail: {},
  listOrderHotel: [],
  orderHotelDetail: {}
}

// getters
const getters = {
  getListOrderAir: state => state.listOrderAir,
  getOrderAirDetail: state => state.orderAirDetail,
  getListOrderHotel: state => state.listOrderHotel,
  getOrderHotelDetail: state => state.orderHotelDetail
}

const actions = {
  listOrderAir ( { commit, state }, options ) {
    let url = options.url
    let data = options.data

    if (options.initQuery) {
      state.listOrderAir = []
    }
    return new Promise(function ( resolve, reject ) {
      http.fetch(url, {
        loading: true,
        data: data,
        type: options.type,
        errMsg: options.errMsg
      })
        .then(res => {
          if (res.body.success) {
            commit(types.LISTORDERAIR, res.body.data.rows)
            resolve(res.body)
          }
          if (!res.body.success) {
            reject(res.body)
          }
        })
    });
  },
  orderAirDetail ( { commit, state }, options ) {
    let url = options.url
    let data = options.data

    state.orderAirDetail = {}
    return new Promise(function ( resolve, reject ) {
      http.fetch(url, {
        loading: true,
        data: data,
        type: options.type,
        errMsg: options.errMsg
      })
        .then(res => {
          if (res.body.success) {
            commit(types.ORDERAIRDETAIL, res.body.data.result)
            resolve(res.body)
          }
          if (!res.body.success) {
            reject(res.body)
          }
        })
    });
  },
  listOrderHotel ( { commit, state }, options ) {
    let url = options.url
    let data = options.data

    state.listOrderHotel = []
    return new Promise(function ( resolve, reject ) {
      http.fetch(url, {
        loading: true,
        data: data,
        type: options.type,
        errMsg: options.errMsg
      })
        .then(res => {
          if (res.body.success) {
            commit(types.LISTORDERHOTEL, res.body.data)
            resolve(res.body)
          }
          if (!res.body.success) {
            reject(res.body)
          }
        })
    });
  },
  orderHotelDetail ( { commit, state }, options ) {
    let url = options.url
    let data = options.data

    state.orderHotelDetail = {}
    return new Promise(function ( resolve, reject ) {
      http.fetch(url, {
        loading: true,
        data: data,
        type: options.type,
        errMsg: options.errMsg
      })
        .then(res => {
          if (res.body.success) {
            commit(types.ORDERHOTELDETAIL, res.body.data)
            resolve(res.body)
          }
          if (!res.body.success) {
            reject(res.body)
          }
        })
    });
  },
}

const mutations = {
  [types.LISTORDERAIR]: (state, data) => {
    state.listOrderAir = state.listOrderAir.concat(data)
  },
  [types.LISTORDERHOTEL]: (state, data) => {
    state.listOrderHotel = data
  },
  [types.ORDERAIRDETAIL]: (state, data) => {
    state.orderAirDetail = data
  },
  [types.ORDERHOTELDETAIL]: (state, data) => {
    state.orderHotelDetail = data
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}

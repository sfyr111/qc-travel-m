import http from '../../api/http'
import * as types from '../mutation-types.js'

const state = {
  cityAirList: [],
  cityQuery: []
}

// getters
const getters = {
  getCityAirList: state => state.cityAirList,
  getCityQuery: state => state.cityQuery,
}

const actions = {
  cityAirList ( { commit }, options ) {
    let url = options.url
    let data = options.data
    return new Promise(function ( resolve, reject ) {
      http.fetch(url, {
        loading: true,
        data: data,
        type: options.type,
        errMsg: options.errMsg
      })
      .then(res => {
        if (res.body.success) {
          commit(types.CITYAIRLIST, res.body.data)
          resolve(res.body)
        }
        if (!res.body.success) {
          reject(res.body)
        }
      })
    });
  },
  cityQuery ( { commit }, options ) {
    let url = options.url
    let data = options.data
    let type = options.type
    return new Promise(function ( resolve, reject ) {
      http.fetch(url, {
        loading: true,
        data: data,
        type: type,
        errMsg: options.errMsg
      })
        .then(res => {
          if (res.body.success) {
            commit(types.CITYQUERY, res.body.data)
            resolve(res.body)
          }
          if (!res.body.success) {
            reject(res.body)
          }
        })
    });
  }
}

const mutations = {
  [types.CITYAIRLIST]: (state, data) => {
    state.cityAirList = data
  },
  [types.CITYQUERY]: (state, data) => {
    state.cityQuery = data
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}

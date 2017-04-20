import http from '../../api/http'
import * as types from '../mutation-types.js'

const state = {
  addressList: [],
}

// getters
const getters = {
  getAddressList: state => state.addressList,
}

const actions = {
  addressList ( { commit, state }, options ) {
    let url = options.url
    let data = options.data

    state.addressList = []
    return new Promise(function ( resolve, reject ) {
      http.fetch(url, {
        loading: true,
        data: data,
        type: options.type,
        errMsg: options.errMsg
      })
      .then(res => {
        if (res.body.success) {
          commit(types.ADDRESSLIST, res.body.data)
          resolve(res.body)
          options.success(res.body.data)
        }
        if (!res.body.success) {
          reject(res.body)
          options.fail(res)
        }
      })
    });
  },
  addressSave ( { commit, state }, options ) {
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
  [types.ADDRESSLIST]: (state, data) => {
    state.addressList = data
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}

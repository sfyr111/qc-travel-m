import http from '../../api/http'
import * as types from '../mutation-types.js'

const state = {
  emailAddressProvince: {},  
  emailAddressCity: {},
  emailAddressArea: {}
}

// getters
const getters = {
  getEmailAddressProvince: state => state.emailAddressProvince,
  getEmailAddressCity: state => state.emailAddressCity,
  getEmailAddressArea: state => state.emailAddressArea,
}

const actions = {
  //  省份
  emailAddressProvince ( { commit, state }, options ) {
    let url = options.url
    let data = options.data

    return new Promise(function ( resolve, reject ) {
      http.fetch(url, {
        data: data,
        type: options.type,
        errMsg: options.errMsg
      })
      .then(res => {
        if (res.body.success) {
          commit(types.EMAILADDRESSPROVINCE, res.body.result)
          resolve(res.body.result)
          options.success(res.body.result)
        }
        else {
          options.fail(res.resultMessage)
        }
      })
    })
  },

  //  城市
  emailAddress ( { commit, state }, options ) {
    let url = options.url
    let data = options.data

    return new Promise(function ( resolve, reject ) {
      http.fetch(url, {
        data: data,
        type: options.type,
        errMsg: options.errMsg
      })
      .then(res => {
        if (res.body.success) {
          res.body.data = options.data
          commit(types.EMAILADDRESS, res.body)
          resolve(res.body.result)
          options.success(res.body.result)
        }
        else {
          options.fail(res.resultMessage)
        }
      })
    })
  },

  //  保存邮寄地址
  saveEmailAddress ({ commit, state }, options) {
    let url = options.url
    let data = options.data

    return new Promise(function ( resolve, reject ) {
      http.fetch(url, {
        data: data,
        type: options.type,
        errMsg: options.errMsg
      })
      .then(res => {
        if (res.body.success) {
          resolve(res.body.data)
          options.success(res.body.data)
        }
        else {
          options.fail(res.msg)
        }
      })
    })
  }

}

const mutations = {
  //  省份
  [types.EMAILADDRESSPROVINCE]: (state, data) => {
    state.emailAddressProvince = data
  },

  //  城市或区域
  [types.EMAILADDRESS]: (state, data) => {
    console.log('id：' + data.data.provinceId)
    if (data.data.provinceId) {
      state.emailAddressCity = data.result
    }
    else {
      state.emailAddressArea = data.result
    }
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}

import http from '../../api/http'
import * as types from '../mutation-types.js'

const state = {
  passList: [],
}

// getters
const getters = {
  getPassList: state => state.passList,
}

const actions = {
  passList ( { commit, state }, options ) {
    let url = options.url
    let data = options.data

    state.passList = []
    return new Promise(function ( resolve, reject ) {
      http.fetch(url, {
        loading: true,
        data: data,
        type: options.type,
        errMsg: options.errMsg
      })
      .then(res => {
        if (res.body.success) {
          let list = []
          let result = res.body.data
          result.map(function (item) {
            item.isCheck = false
            item.checkIns = false
            list.push(item)
          })
          commit(types.PASSLIST, list)
          resolve(res.body)
        }
        if (!res.body.success) {
          reject(res)
        }
      })
    });
  },
  passSave ( { commit, state }, options ) {
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
  [types.PASSLIST]: (state, data) => {
    state.passList = data
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}

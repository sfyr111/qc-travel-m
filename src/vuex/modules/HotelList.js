import http from '../../api/http'
import * as types from '../mutation-types.js'

const state = {
  hotelCityInput: [],      //  酒店城市模糊匹配
  hotelCity: [],           //  酒店城市
}

// getters
const getters = {
  //  酒店城市模糊匹配
  getHotelCityInput: state => state.hotelCityInput,

  //  酒店城市
  getHotelCity: state => state.hotelCity
}

const actions = {
  //  酒店城市模糊匹配
  hotelCityInput ( { commit, state }, opt ) {
	    return new Promise(function ( resolve, reject ) {
	        http.fetch(opt.url, {
            type: opt.type,
	            data: opt.data,
	            errMsg: opt.errMsg
	        })
	        .then(res => {
	            if (res.body.success) {
                commit(types.HOTELCITYINPUT, res.body.data)
                resolve(res.body.data)
              }
              else {
                reject(res.body.msg)
              }
	        })
	    })
	},

  //  酒店城市
  hotelCity ({ commit, state }, opt) {
    return new Promise(function ( resolve, reject ) {
        http.fetch(opt.url, {
          type: opt.type,
            data: opt.data,
            errMsg: opt.errMsg
        })
        .then(res => {
            if (res.body.success) {
              commit(types.HOTELCITY, res.body.data)
              resolve(res.body.data)
            }
            else {
              reject(res.body.msg)
            }
        })
    })
  }
}

const mutations = {
  //  酒店城市模糊匹配
  [types.HOTELCITYINPUT]: (state, data) => {
    state.hotelCityInput = data
  },

  //  酒店城市模糊匹配
  [types.HOTELCITY]: (state, data) => {
    state.hotelCity = data
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}

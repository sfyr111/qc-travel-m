import http from '../../api/http'
import * as types from '../mutation-types.js'

const state = {
  hotelCityInput: [],      //  酒店城市模糊匹配
  hotelCity: [],           //  酒店城市
  hotelBusinessZone: [],    //  商业区
  hotelAdministrativeRegion: [],      //  行政区
  hotelList: [],              //  酒店列表
}

// getters
const getters = {
  //  酒店城市模糊匹配
  getHotelCityInput: state => state.hotelCityInput,

  //  酒店城市
  getHotelCity: state => state.hotelCity,

  //  商业区
  getHotelBusinessZone: state => state.hotelBusinessZone,

  //  行政区
  getHotelAdministrativeRegion: state => state.hotelAdministrativeRegion,

  //  酒店列表
  getHotelList: state => state.hotelList
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
  },

  //  酒店位置区域
  hotelArea ({ commit, state }, opt) {
    return new Promise(function ( resolve, reject ) {
        http.fetch(opt.url, {
          type: opt.type,
          data: opt.data,
          errMsg: opt.errMsg
        })
        .then(res => {
            if (res.body.success) {
              res.body.areaType = opt.data.areaType
              commit(types.HOTELAREA, res.body)
              resolve(res.body.result)
            }
            else {
              reject(res.body.msg)
            }
        })
    })
  },

  //  酒店列表
  setHotelList ({ commit, state }, opt) {
    return new Promise(function ( resolve, reject ) {
        http.fetch(opt.url, {
          type: opt.type,
          data: opt.data,
          errMsg: opt.errMsg,
          loading: true
        })
        .then(res => {
            if (res.body.success) {
              res.body.isInit = opt.isInit
              commit(types.HOTELLIST, res.body)
              resolve(res.body.result)
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

  //  酒店位置区域信息
  [types.HOTELAREA]: (state, data) => {
    //  行政区 areaType -- 1
    if (data.areaType === 1) {
      state.hotelAdministrativeRegion = data.result
    }
    //  商业区
    else {
      state.hotelBusinessZone = data.result
    }
  },
  //  酒店列表
  [types.HOTELLIST]: (state, data) => {
    //  行政区 areaType -- 1
    if (data.isInit) {
      state.hotelList = data.result.searchedHotelInfos
    }
    //  商业区
    else {
      state.hotelList = state.hotelList.concat(data.result.searchedHotelInfos)
    }
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}

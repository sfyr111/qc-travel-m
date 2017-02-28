import http from '../../api/http'
import util from '../../utils/util'
import * as types from '../mutation-types.js'

const state = {
  airList: [],
}

// getters
const getters = {
  getAirList: state => state.airList,
}

const actions = {
  airList ( { commit, state }, options ) {
    let url = options.url
    let data = options.data


    if (options.initQuery) {
      state.airList = []
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
            let result = setData(res.body)
            commit(types.AIRLIST, result)
            resolve(res.body)
          }
          if (!res.body.success) {
            reject(res.body)
          }
        })
    });
  },
}
/**
 * 处理jd返回的数据
 * @param resp
 * @returns {Array}
 */
let setData = function (resp) {
  let airList = []
  if (resp.success) {
    // 判断查询
    if (resp.result && resp.result.list && resp.result.list instanceof Array  && resp.result.list[0].FlightInfo) {
      // 如果返回数据为对象
      if (!resp.result.list[0].FlightInfo.length) {
        resp.result.list[0].FlightInfo.showPannel = true
        // 航班tab对象
        resp.result.list[0].FlightInfo.bingoClassInfos=[]
        if (resp.result.list[0].FlightInfo.bingoClassInfoList
          && resp.result.list[0].FlightInfo.bingoClassInfoList[0].FlightClassInfo
          && !resp.result.list[0].FlightInfo.bingoClassInfoList[0].FlightClassInfo.length) {
          resp.result.list[0].FlightInfo.bingoClassInfos.push(resp.result.list[0].FlightInfo.bingoClassInfoList[0].FlightClassInfo)
        }
        if (resp.result.list[0].FlightInfo.bingoClassInfoList
          && resp.result.list[0].FlightInfo.bingoClassInfoList[0].FlightClassInfo
          && resp.result.list[0].FlightInfo.bingoClassInfoList[0].FlightClassInfo.length) {
          for (let flight of resp.result.list[0].FlightInfo.bingoClassInfoList[0].FlightClassInfo) {
            resp.result.list[0].FlightInfo.bingoClassInfos.push(flight)
          }
        }
        var depTime = resp.result.list[0].FlightInfo.depDate + ' ' +
            resp.result.list[0].FlightInfo.depTime.substring(0, 2)+':'+resp.result.list[0].FlightInfo.depTime.substring(2, 4),
          arrTime = resp.result.list[0].FlightInfo.arrDate + ' ' +
            resp.result.list[0].FlightInfo.arrTime.substring(0, 2)+':'+resp.result.list[0].FlightInfo.arrTime.substring(2, 4);

        resp.result.list[0].FlightInfo.duringTime = util.diffTime(depTime, arrTime)

        airList.push(resp.result.list[0].FlightInfo)
      }
      // 如果返回数据为数组
      if (resp.result.list[0].FlightInfo.length>=1) {
        for (var i = 0; i < resp.result.list[0].FlightInfo.length; i++) {
          resp.result.list[0].FlightInfo[i].showPannel = false
          if (i === 0) {
            resp.result.list[0].FlightInfo[i].showPannel = true
          }
          // 航班tab对象
          resp.result.list[0].FlightInfo[i].bingoClassInfos=[]
          if (resp.result.list[0].FlightInfo[i].bingoClassInfoList
            && resp.result.list[0].FlightInfo[i].bingoClassInfoList[0].FlightClassInfo
            && !resp.result.list[0].FlightInfo[i].bingoClassInfoList[0].FlightClassInfo.length) {
            resp.result.list[0].FlightInfo[i].bingoClassInfos.push(resp.result.list[0].FlightInfo[i].bingoClassInfoList[0].FlightClassInfo)
          }
          if (resp.result.list[0].FlightInfo[i].bingoClassInfoList
            && resp.result.list[0].FlightInfo[i].bingoClassInfoList[0].FlightClassInfo
            && resp.result.list[0].FlightInfo[i].bingoClassInfoList[0].FlightClassInfo.length) {
            for (let flight of resp.result.list[0].FlightInfo[i].bingoClassInfoList[0].FlightClassInfo) {
              resp.result.list[0].FlightInfo[i].bingoClassInfos.push(flight)
            }
          }
          var depTime = resp.result.list[0].FlightInfo[i].depDate + ' ' +
              resp.result.list[0].FlightInfo[i].depTime.substring(0, 2)+':'+resp.result.list[0].FlightInfo[i].depTime.substring(2, 4),
            arrTime = resp.result.list[0].FlightInfo[i].arrDate + ' ' +
              resp.result.list[0].FlightInfo[i].arrTime.substring(0, 2)+':'+resp.result.list[0].FlightInfo[i].arrTime.substring(2, 4);

          resp.result.list[0].FlightInfo[i].duringTime = util.diffTime(depTime, arrTime)
          airList.push(resp.result.list[0].FlightInfo[i])
        }
      }
      return airList
    }
  }
}

const mutations = {
  [types.AIRLIST]: (state, data) => {
    state.airList = state.airList.concat(data)
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}

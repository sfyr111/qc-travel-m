import http from '../../api/http'
import * as types from '../mutation-types.js'

const state = {
	hotelRoomNum: 0,			//	酒店详情
  hotelPreOrder: {},    //  酒店预下单
}

const getters = {
	//	酒店详情
	getHotelRoomNum: state => state.hotelRoomNum,

}

const actions = {
 //	酒店房间数量
 checkHotelRoomNum ({ commit, state }, opt) {
 		return new Promise(function (resolve, reject) {
      http.fetch(opt.url, {
        type: opt.type,
          data: opt.data,
          errMsg: opt.errMsg
      })
      .then(res => {
          if (res.body.success) {
            let roomNum = res.body.result.allRoomNum > 5 ? 5 : res.body.result.allRoomNum
            commit(types.CHECKHOTELROOMNUM, roomNum)
            resolve(roomNum)
            opt.success(roomNum)
          }
          else {
            reject(res.body.resultMessage)
            opt.fail(res.body.resultMessage)
          }
      })
 		})
 },

 // 酒店预下单
 hotelPreOrder ({ commit, state }, opt) {
    return new Promise(function (resolve, reject) {
      http.fetch(opt.url, {
        type: opt.type,
        data: opt.data,
        errMsg: opt.errMsg,
        contentType: 'application/json; charset=UTF-8;'
      })
      .then(res => {
          if (res.body.success) {
            resolve(res.body)
            opt.success(res.body)
          }
          else {
            reject(res.body.msg)
            opt.fail(res.body.msg)
          }
      })
    })
 },

}

const mutations = {
	//	酒店详情
	[types.CHECKHOTELROOMNUM]: (state, data) => {
		state.hotelRoomNum = data
	},
}

export default {
	state,
	actions,
	getters,
	mutations
}
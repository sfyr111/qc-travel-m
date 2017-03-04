import http from '../../api/http'
import * as types from '../mutation-types.js'
import Vue from 'vue'

const state = {
	hotelDetail: {},			//	酒店详情
	hotelRoomTypePrice: {},	//	酒店房型房价
	hotelComment: [],				//	酒店评论
}

const getters = {
	//	酒店详情
	getHotelDetail: state => state.hotelDetail,

	//	酒店房型房价
	getHotelRoomTypePrice: state => state.hotelRoomTypePrice,

	//	酒店评论
	getHotelComment: state => state.hotelComment,

}

const actions = {
 //	酒店详情
 hotelDetail ({ commit, state }, opt) {
 		return new Promise(function (resolve, reject) {
      http.fetch(opt.url, {
        type: opt.type,
          data: opt.data,
          errMsg: opt.errMsg
      })
      .then(res => {
          if (res.body.success) {
            commit(types.HOTELDETAILINFO, res.body.result)
            resolve(res.body.result)
            opt.success(res.body.result)
          }
          else {
            reject(res.body.resultMessage)
            opt.fail(res.body.resultMessage)
          }
      })
      .catch(function (err) {
      	opt.fail(err)
      })
 		})
 },

 //	酒店房型房价
 setHotelRoomTypePrice ({commit, state}, opt) {
		return new Promise(function (resolve, reject) {
	   http.fetch(opt.url, {
	     type: opt.type,
	       data: opt.data,
	       errMsg: opt.errMsg
	   })
	   .then(res => {
	       if (res.body.success) {
	         commit(types.HOTELROOMTYPEPRICE, res.body.result)
	         resolve(res.body.result)
	         opt.success(res.body.result)
	       }
	       else {
	         reject(res.body.resultMessage)
	         opt.fail(res.body.resultMessage)
	       }
	   })
	   .catch(function (err) {
	   	opt.fail(err)
	   })
		})
 },

  //	酒店评论
  setHotelComment ({commit, state}, opt) {
 		return new Promise(function (resolve, reject) {
 	   http.fetch(opt.url, {
 	     type: opt.type,
 	     data: opt.data,
 	     errMsg: opt.errMsg,
 	     loading: opt.isInit
 	   })
 	   .then(res => {
 	       if (res.body.success) {
 	       	 res.body.result.isInit = opt.isInit
 	         commit(types.HOTELCOMMENT, res.body.result)
 	         resolve(res.body.result.apiCommentList)
 	         opt.success(res.body.result.apiCommentList)
 	       }
 	       else {
 	         reject(res.body.resultMessage)
 	         opt.fail(res.body.resultMessage)
 	       }
 	   })
 	   .catch(function (err) {
 	   	opt.fail(err)
 	   })
 		})
  }
}

const mutations = {
	//	酒店详情
	[types.HOTELDETAILINFO]: (state, data) => {
		state.hotelDetail = data
	},

	//	酒店房型房价
	[types.HOTELROOMTYPEPRICE]: (state, data) => {
		state.hotelRoomTypePrice = data
	},

	//	设置酒店房型房价点击显示对应列表
	[types.SHOWHOTELROOMTYPEPRICELIST]: (state, obj) => {
		Vue.set(state.hotelRoomTypePrice.hotelRooms, obj.index, obj)
	},

	//	酒店房型房价
	[types.HOTELCOMMENT]: (state, data) => {
		if (data.isInit) {
			state.hotelComment = data.apiCommentList
		}
		else {
			state.hotelComment = state.hotelComment.concat(data.apiCommentList)
		}
	},
}

export default {
	state,
	actions,
	getters,
	mutations
}
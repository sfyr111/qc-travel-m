import http from '../../api/http'
import * as types from '../mutation-types.js'

const state = {
  hotelList: {}
}

// getters
const getters = {
  getHotelList: state => state.hotelList
}

const actions = {
  hotelList ( { commit, state }, options ) {
    let url = 'http://192.168.16.210:8080/qc-travel/security/hotel/get_hotel_search_data'
    let param = {
            cityId: '819903',
            checkInDate: '2017-02-08',
            checkOutDate: '2017-02-09',
            minPrice: '',
            maxPrice: '',
            star: '',
            cbdId: '',
            disId: '',
            page: 1,
            pageSize: 10,
            hotelSortType: 'sort_hot_level_desc',
            name: ''
        };
               
	    return new Promise(function ( resolve, reject ) {
	        http.fetch(url, {
	            loading: true,
	            data: param,
	            errMsg: options.errMsg
	        })
	        .then(res => {
	            commit(types.HOTELLIST, res.body.result)
	        })
	    });
	}
}

const mutations = {
  [types.HOTELLIST]: (state, data) => {
    state.hotelList = data
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}

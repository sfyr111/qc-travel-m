import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import Loading from './modules/Loading'
import HotelList from './modules/HotelList'
import HotelDetail from './modules/HotelDetail'
import CityAir from './modules/CityAir'
import ListAir from './modules/ListAir'
import Passenager from './modules/Passenager'
import Address from './modules/Address'
import Mange from './modules/Mange'

Vue.use(Vuex)
var store = new Vuex.Store({
	actions,
	getters,
	modules: {
		Loading,
		HotelList,
    CityAir,
    ListAir,
    Passenager,
    HotelDetail,
    Address,
    Mange
	}
})

export default store

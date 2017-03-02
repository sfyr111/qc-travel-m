import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import Loading from './modules/Loading'
import HotelList from './modules/HotelList'
import CityAir from './modules/CityAir'
import ListAir from './modules/ListAir'
import Passenager from './modules/Passenager'
import Address from './modules/Address'

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
	    Address
	}
})

export default store

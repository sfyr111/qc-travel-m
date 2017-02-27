import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import Loading from './modules/Loading'
import HotelList from './modules/HotelList'
import CityAir from './modules/CityAir'

Vue.use(Vuex)
var store = new Vuex.Store({
	actions,
	getters,
	modules: {
		Loading,
		HotelList,
    CityAir
	}
})

export default store

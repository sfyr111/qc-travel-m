import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
	hotelList: {}
}

const mutations = {
	HOTELLIST: (state, data) => {
		state.hotelList = data
	}
}

var store = new Vuex.Store({
	actions,
	getters,
	state,
	mutations
})

export default store
import * as types from '../mutation-types.js'

const state = {
  isLoading: false
}

// getters
const getters = {
  getLoading: state => state.isLoading
}

const actions = {
  upLoadingStatus ({commit}, status) {
    commit(types.ISLOADING, status)
  }
}

const mutations = {
  [types.ISLOADING] (state, status) {
    state.isLoading = status
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}

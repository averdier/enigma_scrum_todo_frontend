import Vue from 'vue'
import Vuex from 'vuex'
import * as todo from './module/todo'
import * as auth from './module/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    reset ({ dispatch }) {
      dispatch('auth/reset')
      dispatch('todo/reset')
    }
  },
  modules: { auth, todo }
})

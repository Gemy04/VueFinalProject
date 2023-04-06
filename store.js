import { createStore } from 'vuex'

const store = createStore({
  state: {
    token: '',
    userId: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserId(state, userId) {
      state.userId = userId
    }
  }
})

export default store




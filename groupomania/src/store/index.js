// import { createStore } from "vuex"

// export default createStore({
//   state: {
//     userId: null,
//     token: null,
//   },
//   getters: {},
//   mutations: {
//     setUser(state, userId) {
//       state.userId = userId
//     },
//     setToken(state, token) {
//       state.token = token
//     },
//   },
//   actions: {},
//   modules: {},
// })

import {reactive} from 'vue'

export const user = reactive({
  userId: null,
  token: null,
})
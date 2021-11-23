import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const api = 'https://6196084574c1bd00176c6ff1.mockapi.io/api/v1/'

export default new Vuex.Store({
  state: {
    list: [],
    isSuccesful: false
  },
  mutations: {
    getCityList (state, payload) {
      state.list = payload
    },
    sendForm (state, payload) {
      state.isSuccesful = payload
    }
  },
  actions: {
    async getCityList ({ commit }) {
      const cityList = await fetch(`${api}cities`)
      const result = await cityList.json()
      commit('getCityList', result)
    },
    async sendForm ({ commit }, payload) {
      try {
        const formData = await fetch(`${api}send-form`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        const result = await formData.json()
        commit('sendForm', result)
        return result
      } catch (e) {
        console.log(e)
      }
    }
  }
})

export const state = () => ({
  user: null
})

export const mutations = {
  login(state, payload) {
    state.user = payload
  },
  logout(state) {
    state.user = null
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const session = await this.$axios.$get('/api/auth/me')
    if (session && session.user) {
      commit('login', session.user)
    }
  }
}

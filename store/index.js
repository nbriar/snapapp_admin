export const state = () => {
  return {
    user: null,
    authToken: null
  }
}

export const mutations = {
  SET_USER (state, payload) {
    state.user = payload.user || null
    state.authToken = payload.token || null
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  }
}

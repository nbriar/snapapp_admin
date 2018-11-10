// initial state
export const state = () => {
  return {
    list: []
  }
}

// getters
export const getters = {
  list: state => state.list
}


// actions
export const actions = {
  GET_ALL ({ commit }) {
    const query = `{
      templates {
        name
        elements
      }
    }`

    this.app.$api({
      query,
      variables: null,
      onSuccess: data => {
        commit('SET_ALL', data.templates)
      },
      onFailure: data => {
        commit('snackbar/SET_SNACK', {text: data, color: 'error'}, { root: true })
      }
    })
  }
}

// mutations
export const mutations = {
  SET_ALL (state, data) {
    state.list = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

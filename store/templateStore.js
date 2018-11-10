// initial state
export const state = () => {
  return {
    list: []
  }
}

// getters
export const getters = {
  list: state => state.templates
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
        console.log('tempaltes', data)
        commit('SET_ALL', data.pages)
      },
      onFailure: data => {
        commit('snackbar/setSnack', {text: data, color: 'error'}, { root: true })
      }
    })
  }
}

// mutations
export const mutations = {
  SET_ALL (state, data) {
    state.templates = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

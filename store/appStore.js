// initial state
export const state = () => {
  return {
    list: [],
    current: {}
  }
}

// getters
export const getters = {
  list: state => state.list,
  current: state => state.current,
  currentId: state => state.current.id
}


// actions
export const actions = {
  GET_ALL ({ commit, rootState }) {
    const query = `{
      customerApps {
        id
        name
        slug
        authAccountId
        createdAt
        updatedAt
      }
    }`

    this.app.$api({
      query,
      variables: null,
      onSuccess: (data) => {
        commit('SET_ALL', data.customerApps)
      },
      onFailure: (data) => {
        commit('snackbar/setSnack', {text: data, color: 'error'}, { root: true })
      }
    })
  },
  GET ({ commit, rootState }, payload) {
    // payload is in the form {id: 345}
    const query = `
    query ($id: ID!) {
      customerApp (id: $id) {
        id
        name
        slug
        authAccountId
        pages {
          id
          title
          route
        }
        collections {
          id
          name
        }
        components {
          id
          name
        }
        createdAt
        updatedAt
      }
    }`

    const variables = {"id": payload.id}

    this.app.$api({
      query,
      variables: variables,
      onSuccess: (data) => {
        commit('SET_CURRENT', data.customerApp)
      },
      onFailure: (data) => {
        commit('snackbar/setSnack', {text: data, color: 'error'}, { root: true })
      }
    })
  },
  NEW ({ commit, rootState}, payload) {
    // payload is in the form {name: "somename"}
    const query = `mutation ($name: String!) {
      createCustomerApp(input: {name: $name}) {
        customerApp {id, name, slug, authAccountId}
        errors
      }
    }`

    const variables = {"name": payload.name}

    this.app.$api({
      query,
      variables: variables,
      onSuccess: (data) => {
        const res = data.createCustomerApp
        if (res.errors.length > 0) {
          commit('snackbar/setSnack', {text: res.errors.join(', '), color: 'error'}, { root: true })
          return
        }

        commit('CREATE', {item: res.customerApp})
      },
      onFailure: (data) => {
        commit('snackbar/setSnack', {text: data, color: 'error'}, { root: true })
      }
    })
  },
  DESTROY ({ commit, rootState}, payload) {
    // payload is inn the form {id: someappid}
    const query = `mutation ($id: Int!){
      deleteCustomerApp(input: {id: $id}) {
        customerApp {id, name, slug, authAccountId}
        errors
      }
    }`

    const variables = {"id": payload.id}

    this.app.$api({
      query,
      variables: variables,
      onSuccess: (data) => {
        const res = data.deleteCustomerApp
        if (res.errors.length > 0) {
          commit('snackbar/setSnack', {text: res.errors.join(', '), color: 'error'}, { root: true })
          return
        }

        commit('DELETE', {item: res.customerApp})
      },
      onFailure: (data) => {
        commit('snackbar/setSnack', {text: data, color: 'error'}, { root: true })
      }
    })
  },
  EDIT ({ commit, rootState}, payload) {
    // payload is inn the form {id: someappid, name: somenewname}
    const query = `mutation ($id: Int!, $name: String!) {
      updateCustomerApp(input: {id: $id, name: $name}) {
        customerApp {id, name, slug, authAccountId}
        errors
      }
    }`

    const variables = {"id": payload.id, "name": payload.name}

    this.app.$api({
      query,
      variables: variables,
      onSuccess: (data) => {
        const res = data.updateCustomerApp
        if (res.errors.length > 0) {
          commit('snackbar/setSnack', {text: res.errors.join(', '), color: 'error'}, { root: true })
          return
        }

        commit('UPDATE', {item: res.customerApp})
      },
      onFailure: (data) => {
        commit('snackbar/setSnack', {text: data, color: 'error'}, { root: true })
      }

    })
  }
}

// mutations
export const mutations = {
  SET_ALL (state, data) {
    state.list = data
  },
  SET_CURRENT (state, data) {
    state.current = data
    this.app.store.commit('pages/SET_ALL', data.pages)
    this.app.$axios.setHeader('X-APP-ID', data.id)
  },
  CREATE (state, data) {
    if (data.item) {
     state.list.push(data.item)
    }
  },
  UPDATE (state, data) {
    const updatedApp = state.list.find(function (app) {
      return app.id === data.item.id
    })

    const index = state.list.indexOf(updatedApp)

    if (index !== -1) {
      state.list.splice(index, 1)
      state.list.push(data.item)
    }
  },
  DELETE (state, data) {
    const deletedApp = state.list.find(function (app) {
      return app.id === data.item.id
    })

    const index = state.list.indexOf(deletedApp)

    if (index !== -1) {
      state.list.splice(index, 1)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

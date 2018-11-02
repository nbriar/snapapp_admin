import http from '../utils/http-common'
import api from '../utils/api'

// initial state
export const state = () => {
  return {
    apps: [],
    currentApp: {}
  }
}

// getters
export const getters = {
  apps: state => state.apps,
  currentApp: state => state.currentApp
}


// actions
export const actions = {
  GET_ALL_APPS ({ commit, rootState }) {
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
    api({
      token: rootState.authToken,
      query,
      variables: null,
      onSuccess: data => {
        commit('SET_APPS', data.customerApps)
      },
      onFailure: data => {
        commit('snackbar/setSnack', {text: data, color: 'error'}, { root: true })
      }
    })
  },
  GET_APP ({ commit, rootState }, payload) {
    // payload is in the form {id: 345}
    const query = `
    query ($id: ID!) {
      customerApp (id: $id) {
        id
        name
        slug
        authAccountId
        pages {
          title
        }
        collections {
          name
        }
        components {
          name
        }
        createdAt
        updatedAt
      }
    }`

    const variables = {"id": payload.id}

    api({
      token: rootState.authToken,
      query,
      variables: variables,
      onSuccess: data => {
        commit('SET_CURRENT_APP', data.customerApp)
      },
      onFailure: data => {
        commit('snackbar/setSnack', {text: data, color: 'error'}, { root: true })
      }
    })
  },
  NEW_APP ({ commit, rootState}, payload) {
    // payload is in the form {name: "somename"}
    const query = `mutation ($name: String!) {
      createCustomerApp(input: {name: $name}) {
        customerApp {id, name, slug, authAccountId}
        errors
      }
    }`

    const variables = {"name": payload.name}

    api({
      token: rootState.authToken,
      query,
      variables: variables,
      onSuccess: data => {
        const res = data.createCustomerApp
        if (res.errors.length > 0) {
          commit('snackbar/setSnack', {text: res.errors.join(', '), color: 'error'}, { root: true })
          return
        }

        commit('CREATE_APP', {item: res.customerApp})
      },
      onFailure: data => {
        commit('snackbar/setSnack', {text: data, color: 'error'}, { root: true })
      }
    })
  },
  DESTROY_APP ({ commit, rootState}, payload) {
    // payload is inn the form {id: someappid}
    const query = `mutation ($id: Int!){
      deleteCustomerApp(input: {id: $id}) {
        customerApp {id, name, slug, authAccountId}
        errors
      }
    }`

    const variables = {"id": payload.id}

    api({
      token: rootState.authToken,
      query,
      variables: variables,
      onSuccess: data => {
        const res = data.deleteCustomerApp
        if (res.errors.length > 0) {
          commit('snackbar/setSnack', {text: res.errors.join(', '), color: 'error'}, { root: true })
          return
        }

        commit('DELETE_APP', {item: res.customerApp})
      },
      onFailure: data => {
        commit('snackbar/setSnack', {text: data, color: 'error'}, { root: true })
      }
    })
  },
  EDIT_APP ({ commit, rootState}, payload) {
    // payload is inn the form {id: someappid, name: somenewname}
    const query = `mutation ($id: Int!, $name: String!) {
      updateCustomerApp(input: {id: $id, name: $name}) {
        customerApp {id, name, slug, authAccountId}
        errors
      }
    }`

    const variables = {"id": payload.id, "name": payload.name}

    api({
      token: rootState.authToken,
      query,
      variables: variables,
      onSuccess: data => {
        const res = data.updateCustomerApp
        if (res.errors.length > 0) {
          commit('snackbar/setSnack', {text: res.errors.join(', '), color: 'error'}, { root: true })
          return
        }

        commit('UPDATE_APP', {item: res.customerApp})
      },
      onFailure: data => {
        commit('snackbar/setSnack', {text: data, color: 'error'}, { root: true })
      }

    })
  }
}

// mutations
export const mutations = {
  SET_APPS (state, data) {
    state.apps = data
  },
  SET_CURRENT_APP (state, data) {
    state.currentApp = data
  },
  CREATE_APP (state, data) {
    if (data.item) {
     state.apps.push(data.item)
    }
  },
  UPDATE_APP (state, data) {
    const updatedApp = state.apps.find(function (app) {
      return app.id === data.item.id
    })

    const index = state.apps.indexOf(updatedApp)

    if (index !== -1) {
      state.apps.splice(index, 1)
      state.apps.push(data.item)
    }
  },
  DELETE_APP (state, data) {
    const deletedApp = state.apps.find(function (app) {
      return app.id === data.item.id
    })

    const index = state.apps.indexOf(deletedApp)

    if (index !== -1) {
      state.apps.splice(index, 1)
    }
  }
}

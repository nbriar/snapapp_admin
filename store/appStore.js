import http from '../utils/http-common'

const api = function (token, query, callback) {
  http(token).post(`http://localhost:3000/graphql`, {query: query})
    .then(response => {
      const data = response.data.data
      if (response.data.errors) {
        console.log('ERROR: ', response.data.errors)
        return null
      }
      callback(data)
    })
    .catch(e => {
      console.log('ERROR: ', e)
      return null
    })
}

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
  currentApp: state => state.currentApp,
  appById: (state) => (id) => {
    return state.apps.find(app => app.id === id)
  }
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
    api(rootState.authToken, query, data => {
      commit('SET_APPS', data.customerApps)
    })
  },

  NEW_APP ({ commit, rootState}, payload) {
    // payload is inn the form {name: "somename"}
    const query = `mutation {
      createCustomerApp(input: {name: "${payload.name}"}) {
        customerApp {id, name, slug, authAccountId}
        errors
      }
    }`

    api(rootState.authToken, query, data => {
      const res = data.createCustomerApp
      if (res.errors.length > 0) {
        // create an alerts store and emit here
        console.log('ERROR:', res.errors)
        return
      }

      commit('CREATE_APP', {item: res.customerApp})
    })
  },
  DESTROY_APP ({ commit, rootState}, payload) {
    // payload is inn the form {id: someappid}
    const query = `mutation {
      deleteCustomerApp(input: {id: ${payload.id}}) {
        customerApp {id, name, slug, authAccountId}
        errors
      }
    }`

    api(rootState.authToken, query, data => {
      const res = data.deleteCustomerApp
      if (res.errors.length > 0) {
        // create an alerts store and emit here
        console.log('ERROR:', res.errors)
        return
      }

      commit('DELETE_APP', {item: res.customerApp})
    })
  },
  EDIT_APP ({ commit, rootState}, payload) {
    // payload is inn the form {id: someappid, name: somenewname}
    const query = `mutation {
      updateCustomerApp(input: {id: ${payload.id}, name: "${payload.name}"}) {
        customerApp {id, name, slug, authAccountId}
        errors
      }
    }`

    api(rootState.authToken, query, data => {
      const res = data.updateCustomerApp
      if (res.errors.length > 0) {
        // create an alerts store and emit here
        console.log('ERROR:', res.errors)
        return
      }

      commit('UPDATE_APP', {item: res.customerApp})
    })
  }
}

//   getApp ({ commit }, payload) {
//     appsApi.findApp(payload.id, data => {
//       commit('findApp', {app: data})
//     })
//   },
//   updateApp ({ commit }, payload) {
//     appsApi.editApp(payload, data => {
//       commit('editApp', {oldApp: payload.item, newApp: data})
//     })
//   },
//   newApp ({ commit }, payload) {
//     appsApi.createApp(payload, data => {
//       commit('createApp', {newApp: data})
//     })
//   },
//   destroyApp ({ commit }, payload) {
//     appsApi.deleteApp(payload, data => {
//       commit('deleteApp', {app: payload.item})
//     })
//   }
// }


export const mutations = {
  SET_APPS (state, data) {
    state.apps = data
  },
  CREATE_APP (state, data) {
    if (data.item) {
     state.apps.push(data.item)
    }
  },
  UPDATE_APP (state, data) {
    var updatedApp = state.apps.find(function (app) {
      return app.id === data.item.id
    })

    const index = state.apps.indexOf(updatedApp)

    if (index !== -1) {
      state.apps.splice(index, 1)
      state.apps.push(data.item)
    }
  },
  DELETE_APP (state, data) {
    var deletedApp = state.apps.find(function (app) {
      return app.id === data.item.id
    })

    const index = state.apps.indexOf(deletedApp)

    if (index !== -1) {
      state.apps.splice(index, 1)
    }
  }
}
// // mutations
// const mutations = {
//   setApps (state, data) {
//     state.apps = data
//   },
//   findApp (state, data) {
//     state.currentApp = data.app
//   },
//   editApp (state, data) {
//     const index = state.apps.indexOf(data.oldApp)
//
//     if (index !== -1) {
//       state.apps[index] = data.newApp
//     }
//   },
//   createApp (state, data) {
//     if (data.newApp) {
//       state.apps.push(data.newApp)
//     }
//   },
//   deleteApp (state, data) {
//     var deletedApp = state.apps.find(function (app) {
//       return app.id === data.app.id
//     })
//
//     const index = state.apps.indexOf(deletedApp)
//
//     if (index !== -1) {
//       state.apps.splice(index, 1)
//     }
//   }
// }
//
// export default {
//   state
//   // getters,
//   // actions,
//   // mutations
// }

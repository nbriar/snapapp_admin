import http from '../utils/http-common'

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
  ALL_APPS ({ commit, rootState }) {
    const body = `{
      customerApps {
        name
        slug
        authAccountId
        createdAt
        updatedAt
      }
    }`

    http(rootState.authToken).post(`http://localhost:3000/graphql`, {query: body})
      .then(response => {
        const data = response.data.data
        if (response.data.errors) {
          console.log('ERROR - fetching apps: ', response.data.errors)
          return []
        }
        console.log('Getting: ', `customer_apps`)
        commit('SET_APPS', data.customerApps)
        return  data.customerApps
      })
      .catch(e => {
        console.log('ERROR - fetching apps: ', e)
        return []
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

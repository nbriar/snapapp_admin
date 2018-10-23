// import appsApi from '../api/apps-api'
//
// // initial state
// const state = {
//   apps: [],
//   currentApp: {}
// }
//
// // getters
// const getters = {
//   apps: state => state.apps,
//   currentApp: state => state.currentApp,
//   appById: (state) => (id) => {
//     return state.apps.find(app => app.id === id)
//   }
// }
//
// // actions
// const actions = {
//   getAllApps ({ commit }) {
//     appsApi.getApps(data => {
//       commit('setApps', data.customer_apps)
//     })
//   },
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
//
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
//   state,
//   getters,
//   actions,
//   mutations
// }

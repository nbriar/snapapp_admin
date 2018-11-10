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
  current: state => state.current
}


// actions
export const actions = {
  GET_ALL ({ commit }) {
    const query = `{
      collections {
        id
        name
      }
    }`

    this.app.$api({
      query,
      variables: null,
      onSuccess: data => {
        commit('SET_ALL', data.collections)
      },
      onFailure: data => {
        commit('snackbar/SET_SNACK', {text: data, color: 'error'}, { root: true })
      }
    })
  }
  // GET_ONE ({ commit, rootState }, payload) {
  //   // payload is in the form {id: 345}
  //   const query = `
  //   query ($id: ID!) {
  //     page (id: $id) {
  //       id
  //       title
  //       route
  //       collections {
  //         title
  //       }
  //       components {
  //         title
  //       }
  //       createdAt
  //       updatedAt
  //     }
  //   }`
  //
  //   const variables = {"id": payload.id}
  //
  //   this.app.$api({
  //     query,
  //     variables: variables,
  //     onSuccess: data => {
  //       commit('SET_CURRENT', data.page)
  //     },
  //     onFailure: data => {
  //       commit('snackbar/SET_SNACK', {text: data, color: 'error'}, { root: true })
  //     }
  //   })
  // },
  // NEW ({ commit, rootState}, payload) {
  //   // payload is in the form {appId: this.$route.params.appId, title: this.newPageName}
  //   const query = `mutation ($title: String!, $appId: Int!) {
  //     createPage(input: {title: $title, appId: $appId}) {
  //       page {id, title, route}
  //       errors
  //     }
  //   }`
  //
  //   const variables = {"title": payload.title, "appId": rootState.apps.current.id}
  //
  //   this.app.$api({
  //     query,
  //     variables: variables,
  //     onSuccess: data => {
  //       const res = data.createPage
  //       if (res.errors.length > 0) {
  //         commit('snackbar/SET_SNACK', {text: res.errors.join(', '), color: 'error'}, { root: true })
  //         return
  //       }
  //
  //       commit('CREATE', {item: res.page})
  //     },
  //     onFailure: data => {
  //       commit('snackbar/SET_SNACK', {text: data, color: 'error'}, { root: true })
  //     }
  //   })
  // },
  // DESTROY ({ commit, rootState}, payload) {
  //   // payload is inn the form {id: some_integer_id}
  //   const query = `mutation ($id: Int!){
  //     deletePage(input: {id: $id}) {
  //       page {id, title, route}
  //       errors
  //     }
  //   }`
  //
  //   const variables = {"id": payload.id}
  //
  //   this.app.$api({
  //     query,
  //     variables: variables,
  //     onSuccess: data => {
  //       const res = data.deletePage
  //       if (res.errors.length > 0) {
  //         commit('snackbar/SET_SNACK', {text: res.errors.join(', '), color: 'error'}, { root: true })
  //         return
  //       }
  //
  //       commit('DELETE', {item: res.page})
  //     },
  //     onFailure: data => {
  //       commit('snackbar/SET_SNACK', {text: data, color: 'error'}, { root: true })
  //     }
  //   })
  // },
  // EDIT ({ commit, rootState}, payload) {
  //   // payload is in the form {id: someappid, title: somenewtitle}
  //   const query = `mutation ($id: Int!, $title: String!) {
  //     updatePage(input: {id: $id, title: $title}) {
  //       page {id, title, route}
  //       errors
  //     }
  //   }`
  //
  //   const variables = {"id": payload.id, "title": payload.title}
  //
  //   this.app.$api({
  //     query,
  //     variables: variables,
  //     onSuccess: data => {
  //       const res = data.updatePage
  //       if (res.errors.length > 0) {
  //         commit('snackbar/SET_SNACK', {text: res.errors.join(', '), color: 'error'}, { root: true })
  //         return
  //       }
  //
  //       commit('UPDATE', {item: res.page})
  //     },
  //     onFailure: data => {
  //       commit('snackbar/SET_SNACK', {text: data, color: 'error'}, { root: true })
  //     }
  //
  //   })
  // }
}

// mutations
export const mutations = {
  SET_ALL (state, data) {
    state.list = data
  }
  // SET_CURRENT (state, data) {
  //   state.current = data
  // },
  // CREATE (state, data) {
  //   if (data.item) {
  //    state.list.push(data.item)
  //   }
  // },
  // UPDATE (state, data) {
  //   const updatedPage = state.list.find(function (app) {
  //     return app.id === data.item.id
  //   })
  //
  //   const index = state.list.indexOf(updatedPage)
  //
  //   if (index !== -1) {
  //     state.list.splice(index, 1)
  //     state.list.push(data.item)
  //   }
  // },
  // DELETE (state, data) {
  //   const deletedPage = state.list.find(function (app) {
  //     return app.id === data.item.id
  //   })
  //
  //   const index = state.list.indexOf(deletedPage)
  //
  //   if (index !== -1) {
  //     state.list.splice(index, 1)
  //   }
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

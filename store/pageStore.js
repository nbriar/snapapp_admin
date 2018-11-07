// initial state
export const state = () => {
  return {
    pages: [],
    currentPage: {}
  }
}

// getters
export const getters = {
  list: state => state.pages,
  current: state => state.currentPage
}


// actions
export const actions = {
  GET_ALL ({ commit }) {
    const query = `{
      pages {
        id
        title
        route
        createdAt
        updatedAt
      }
    }`

    this.app.$api({
      query,
      variables: null,
      onSuccess: data => {
        commit('SET_ALL', data.pages)
      },
      onFailure: data => {
        commit('snackbar/setSnack', {text: data, color: 'error'}, { root: true })
      }
    })
  },
  GET_ONE ({ commit, rootState }, payload) {
    // payload is in the form {id: 345}
    const query = `
    query ($id: ID!) {
      page (id: $id) {
        id
        title
        route
        collections {
          title
        }
        components {
          title
        }
        createdAt
        updatedAt
      }
    }`

    const variables = {"id": payload.id}

    this.app.$api({
      query,
      variables: variables,
      onSuccess: data => {
        commit('SET_CURRENT', data.page)
      },
      onFailure: data => {
        commit('snackbar/setSnack', {text: data, color: 'error'}, { root: true })
      }
    })
  },
  NEW ({ commit, rootState}, payload) {
    // payload is in the form {appId: this.$route.params.appId, title: this.newPageName}
    const query = `mutation ($title: String!, $appId: Int!) {
      createPage(input: {title: $title, appId: $appId}) {
        page {id, title, route}
        errors
      }
    }`

    const variables = {"title": payload.title, "appId": rootState.apps.current.id}

    this.app.$api({
      query,
      variables: variables,
      onSuccess: data => {
        const res = data.createPage
        if (res.errors.length > 0) {
          commit('snackbar/setSnack', {text: res.errors.join(', '), color: 'error'}, { root: true })
          return
        }

        commit('CREATE', {item: res.page})
      },
      onFailure: data => {
        commit('snackbar/setSnack', {text: data, color: 'error'}, { root: true })
      }
    })
  },
  DESTROY ({ commit, rootState}, payload) {
    // payload is inn the form {id: some_integer_id}
    const query = `mutation ($id: Int!){
      deletePage(input: {id: $id}) {
        page {id, title, route}
        errors
      }
    }`

    const variables = {"id": payload.id}

    this.app.$api({
      query,
      variables: variables,
      onSuccess: data => {
        const res = data.deletePage
        if (res.errors.length > 0) {
          commit('snackbar/setSnack', {text: res.errors.join(', '), color: 'error'}, { root: true })
          return
        }

        commit('DELETE', {item: res.page})
      },
      onFailure: data => {
        commit('snackbar/setSnack', {text: data, color: 'error'}, { root: true })
      }
    })
  },
  EDIT ({ commit, rootState}, payload) {
    // payload is in the form {id: someappid, title: somenewtitle}
    const query = `mutation ($id: Int!, $title: String!) {
      updatePage(input: {id: $id, title: $title}) {
        page {id, title, route}
        errors
      }
    }`

    const variables = {"id": payload.id, "title": payload.title}

    this.app.$api({
      query,
      variables: variables,
      onSuccess: data => {
        const res = data.updatePage
        if (res.errors.length > 0) {
          commit('snackbar/setSnack', {text: res.errors.join(', '), color: 'error'}, { root: true })
          return
        }

        commit('UPDATE', {item: res.page})
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
    state.pages = data
  },
  SET_CURRENT (state, data) {
    state.currentPage = data
  },
  CREATE (state, data) {
    if (data.item) {
     state.pages.push(data.item)
    }
  },
  UPDATE (state, data) {
    const updatedPage = state.pages.find(function (app) {
      return app.id === data.item.id
    })

    const index = state.pages.indexOf(updatedPage)

    if (index !== -1) {
      state.pages.splice(index, 1)
      state.pages.push(data.item)
    }
  },
  DELETE (state, data) {
    const deletedPage = state.pages.find(function (app) {
      return app.id === data.item.id
    })

    const index = state.pages.indexOf(deletedPage)

    if (index !== -1) {
      state.pages.splice(index, 1)
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

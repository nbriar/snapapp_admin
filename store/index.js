import Vuex from 'vuex'
import apps from './appStore'
import pages from './pageStore'
import templates from './templateStore'
import appComponents from './appComponentStore'
import snackbar from './snackbar'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      user: null,
      authToken: null
    }),
    getters: {
      isAuthenticated (state) {
        return !!state.user
      },
      loggedUser (state) {
        return state.user
      },
      authToken (state) {
        return state.authToken
      }
    },
    mutations: {
      SET_USER (state, payload) {
        state.user = payload.user || null
        state.authToken = payload.token || null
      }
    },
    modules: {
      snackbar,
      apps,
      pages,
      templates,
      appComponents
    }
  })
}

export default createStore

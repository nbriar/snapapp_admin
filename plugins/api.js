import { API_URL } from '../config.json'
import { unsetToken } from '../utils/auth'
import config from '../config.json'

export default ({ app, store, redirect }) => {
  const config = {
    headers: {}
  }

  app.$api = ({query, variables, onSuccess, onFailure}) => {
    const token = (store.state.authToken) ? store.state.authToken : null
    const appId = (store.state.apps && store.state.apps.current) ? store.state.apps.currentId : null

    if (appId) {
      config.headers['X-APP-ID'] = appId
    }

    if (token) {
      config.headers['Authorization'] = token
    }

    app.$axios.post(API_URL, {query: query, variables: variables}, config)
      .then(response => {
        const data = response.data.data

        if (response.data.errors) {
          const errors = response.data.errors || response.errors
          console.log('ERROR1:', errors)
          onFailure(errors.map(x => x.message).join(', '))
          return null
        }

        onSuccess(data)
      })
      .catch(e => {
        if (e.response.status === 401) {
          return redirect('/auth/sign-in')
        }
        onFailure(e.message)
        return null
      })
}}

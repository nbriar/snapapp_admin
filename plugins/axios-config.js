import config from '../config.json'

export default ({store, app: { $axios }}) => {
  $axios.defaults.baseURL = config.API_URL
  $axios.setHeader('Authorization', `Bearer ${store.state.authToken}`)

  if (store.state.apps && store.state.apps.current) {
    $axios.setHeader('X-APP-ID', store.state.apps.current.id)
  }
}

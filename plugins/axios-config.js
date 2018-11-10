import config from '../config.json'

export default ({app: { $axios }}) => {
  $axios.defaults.baseURL = config.API_URL 
}

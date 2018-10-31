import http from '../utils/http-common'
const config = require('../config.json')

export default function ({token, query, variables, callback}) {
  http(token).post(config.SNAPAPP_API_URL, {query: query, variables: variables})
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

import http from '../utils/http-common'
import { unsetToken } from './auth'
const config = require('../config.json')

export default function ({token, query, variables, onSuccess, onFailure}) {
  http(token).post(config.SNAPAPP_API_URL, {query: query, variables: variables})
    .then(response => {
      const data = response.data.data

      if (response.data.errors) {
        const errors = response.data.errors || response.errors
        onFailure(errors.join(', '))
        return null
      }

      onSuccess(data)
    })
    .catch(e => {
      if (e.response.status === 401) {
       unsetToken()
       window.location = '/auth/sign-in'
      }

      onFailure(e.message)
      return null
    })
}

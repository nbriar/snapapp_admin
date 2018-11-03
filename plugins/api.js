import { API_URL } from '../config.json'
import { unsetToken } from '../utils/auth'

export default ({ app }) => {

  app.$api = ({query, variables, onSuccess, onFailure}) => {
    app.$axios.post(API_URL, {query: query, variables: variables})
      .then(response => {
        const data = response.data.data

        if (response.data.errors) {
          const errors = response.data.errors || response.errors
          console.log('ERROR1:', errors)
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
}}

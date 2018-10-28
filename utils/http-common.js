import axios from 'axios'

export default function (authToken, appSlug) {
  return axios.create({
    headers: {
      Authorization: `Bearer ${authToken}`,
      'X-APP-ID': appSlug || 'unknown'
    }
  })
}

import http from '../../utils/http-common'
import { auth } from '../../utils/auth'

function _index () {
  return http(auth.token).get(`${process.env.apiBaseUrl}/customer_apps`)
    .then(response => {
      console.log('Getting: ', `${process.env.apiBaseUrl}/customer_apps`)
      return response.data
    })
    .catch(e => {
      console.log('ERROR - fetching apps: ', e)
      return []
    })
}

function _show (id) {
  return http(auth.token).get(`${process.env.apiBaseUrl}/customer_apps/${id}`)
    .then(response => {
      return response.data
    })
    .catch(e => {
      console.log(`ERROR - fetching app with id ${id}: `, e)
      return {}
    })
}

function _edit (data) {
  const url = data.item.url
  const body = data.body

  return http(auth.token).put(url, body)
    .then(response => {
      return response.data
    })
    .catch(e => {
      console.log('ERROR - editing app: ', e)
      return []
    })
}

function _create (data) {
  const body = data.body

  return http(auth.token).post(`${process.env.apiBaseUrl}/customer_apps`, body)
    .then(response => {
      console.log('Creating: ', `${process.env.apiBaseUrl}/customer_apps`)

      return response.data
    })
    .catch(e => {
      console.log('ERROR - creating app: ', e)
      return []
    })
}

function _delete (data) {
  const url = data.item.url
  const body = data.body

  return http(auth.token).delete(url, body)
    .then(response => {
      return true
    })
    .catch(e => {
      console.log(`ERROR - deleting app (${url}): `, e)
      return false
    })
}

export default {
  getApps (cb) {
    _index().then((data) => { cb(data) })
  },
  findApp (id, cb) {
    _show(id).then((data) => { cb(data) })
  },
  editApp (body, cb) {
    _edit(body).then((data) => { cb(data) })
  },
  createApp (body, cb) {
    _create(body).then((data) => { cb(data) })
  },
  deleteApp (body, cb) {
    _delete(body).then((data) => { cb(data) })
  }
}

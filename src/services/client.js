import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
})

export const API = {
  getAll: () =>
    new Promise((resolve, reject) => {
      client
        .get('/')
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    }),
  getGroup: quantity =>
    new Promise((resolve, reject) => {
      client
        .get('/group/?q=' + quantity)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    }),
  getBalance: () =>
    new Promise((resolve, reject) => {
      client
        .get('/balance/')
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    }),
}

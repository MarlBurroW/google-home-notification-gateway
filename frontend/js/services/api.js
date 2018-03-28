// This module is an abstract layer to handle all API calls

import {create} from 'apisauce'
import Promise from 'bluebird'
import events from 'events'
import ApiError from '../classes/ApiError'

// Create an APISAUCE instance
const APISauceInstance = create({
  baseURL: `/api`
})

const debug = process.env.NODE_ENV !== 'production'
let eventEmitter = new events.EventEmitter()

// These lines are used to display all API calls in the console (only in debug mode)
if (debug === true) {
  APISauceInstance.addRequestTransform((request) => {
    console.log(`%cAPI REQUEST (${request.method.toUpperCase()} ${request.url}) PARAMS:`, 'background: orange; color: white', request.data)
  })

  APISauceInstance.addResponseTransform((response) => {
    if (response.ok === false) {
      let css = 'background: red; color: white'
      console.log(`%cAPI RESPONSE ${response.status} (${response.config.method.toUpperCase()} ${response.config.url} ${response.duration}ms) DATA:`, css, response.problem, response.data ? response.data : 'no data')
    } else {
      let css = 'background: green; color: white'
      console.log(`%cAPI RESPONSE ${response.status} (${response.config.method.toUpperCase()} ${response.config.url} ${response.duration}ms) DATA:`, css, response.data)
    }
  })
}

// When mockDelay is true, the API simulate a response delay to test UI
const mockDelay = false
const mockDelayMax = 3000

// Handler for all responses
function processResponse (response) {
  let promise = new Promise((resolve, reject) => {
    if (response.ok === false) {
      // if (debug) {
      //   console.error(response.problem)
      // }

      if (response.status === 403) {
        eventEmitter.emit('wrongToken')
      }
      let test = new ApiError(response)
      console.error(test.getResponse())
      reject(test)
    } else {
      if (response.status === 204) {
        resolve()
      } else {
        resolve(response.data)
      }
    }
  })

  if (mockDelay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(promise)
      }, Math.floor(Math.random() * mockDelayMax))
    })
  } else {
    return promise
  }
}

let adminToken = null

function setAdminToken (token) {
  adminToken = token
}

function removeAdminToken () {
  adminToken = null
  eventEmitter.removeAllListeners('wrongToken')
}

let latestMap = {}

function takeLatest (type, promise) {
  latestMap[type] = promise
  return new Promise((resolve, reject) => {
    promise.then((result) => {
      if (promise === latestMap[type]) {
        latestMap[type] = null
        resolve(result)
      }
    }).catch((result) => {
      if (promise === latestMap[type]) {
        latestMap[type] = null
        resolve(result)
      }
    })
  })
}

APISauceInstance.addRequestTransform((request) => {
  if (adminToken) {
    request.headers['Authorization'] = adminToken
  }
})

// All API methods,
// !! Each methods must return a promise
const APIMethods = {
  // Application related methods
  getAdminToken: (password) => APISauceInstance.post('/admin_tokens', {password}).then(processResponse),

  getApiKeys: () => APISauceInstance.get('/apikeys').then(processResponse),
  updateApiKey: (apiKey) => APISauceInstance.put(`/apikeys/${apiKey.id}`, apiKey).then(processResponse),
  createApiKey: (apiKey) => APISauceInstance.post(`/apikeys`, apiKey).then(processResponse),
  removeApiKey: (apiKey) => APISauceInstance.delete(`/apikeys/${apiKey.id}`).then(processResponse),

  getLocaltunnel: () => APISauceInstance.get('/localtunnel').then(processResponse),
  stopLocaltunnel: () => APISauceInstance.delete('/localtunnel').then(processResponse),
  startLocaltunnel: () => APISauceInstance.post('/localtunnel').then(processResponse),

  getDevices: () => APISauceInstance.get('/devices').then(processResponse),
  updateDevice: (device) => APISauceInstance.put(`/devices/${device.id}`, device).then(processResponse),
  createDevice: (device) => APISauceInstance.post(`/devices`, device).then(processResponse),
  removeDevice: (device) => APISauceInstance.delete(`/devices/${device.id}`).then(processResponse),

  getSettings: () => APISauceInstance.get('/settings').then(processResponse),
  updateSettings: (settings) => APISauceInstance.put(`/settings`, settings).then(processResponse),

  sendNotification: (device, data) => APISauceInstance.post(`/devices/${device.id}/notifications`, data).then(processResponse),

  checkHost: (ipAddress) => APISauceInstance.post(`/checkhost`, {ip_address: ipAddress}).then(processResponse)

}

// Create an API with the Axios instance (because the axios instance is sometime needed from outside the module)
const API = {
  axios: APISauceInstance.axiosInstance,
  setAdminToken,
  removeAdminToken,
  takeLatest,
  events: eventEmitter
}

// ...and add all API methods to this API Object
Object.assign(API, APIMethods)

// Return the API object
export default API

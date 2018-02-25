// This module is an abstract layer to handle all API calls

import {create} from 'apisauce'
import Promise from 'bluebird'
import events from 'events'

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

// Handler for all responses
function processResponse (response) {
  return new Promise((resolve, reject) => {
    if (response.ok === false) {
      console.error(response.problem)

      if (response.status === 403) {
        eventEmitter.emit('wrongToken')
      }

      reject(response)
    } else {
      if (response.status === 204) {
        resolve()
      } else {
        resolve(response.data)
      }
    }
  })
}

let adminToken = null

function setAdminToken (token) {
  adminToken = token
}

function removeAdminToken () {
  adminToken = null
  eventEmitter.removeAllListeners('wrongToken')
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
  getDevices: () => APISauceInstance.get('/devices').then(processResponse),
  setAdminToken
}

// Create an API with the Axios instance (because the axios instance is sometime needed from outside the module)
const API = {
  axios: APISauceInstance.axiosInstance,
  setAdminToken,
  removeAdminToken,
  events: eventEmitter
}

// ...and add all API methods to this API Object
Object.assign(API, APIMethods)

// Return the API object
export default API

import API from '../../services/api'
import Promise from 'bluebird'

const globalModule = {
  namespaced: true,
  state: {
    loggedIn: false,
    waiting: {
      getAdminToken: false,
      login: false
    }
  },
  mutations: {
    STORE_WAITING_STATUS (state, payload) {
      state.waiting[payload.type] = payload.status
    },
    STORE_LOGIN_STATUS (state, status) {
      state.loggedIn = status
    }
  },
  actions: {
    getAdminToken (context, password) {
      context.commit('STORE_WAITING_STATUS', {type: 'getAdminToken', status: true})
      return API.getAdminToken(password).then((adminToken) => {
        return adminToken.token
      }).finally(() => {
        context.commit('STORE_WAITING_STATUS', {type: 'getAdminToken', status: false})
      })
    },
    logout (context) {
      context.commit('STORE_LOGIN_STATUS', false)
      API.removeAdminToken()
      // TODO Clear state of all module
    },
    login (context, password) {
      context.commit('STORE_WAITING_STATUS', {type: 'login', status: true})
      return context.dispatch('getAdminToken', password).then((token) => {
        API.setAdminToken(token)
        API.events.on('wrongToken', () => {
          return context.dispatch('logout')
        })
        return context.dispatch('getInitialData').then(() => {
          context.commit('STORE_LOGIN_STATUS', true)
        })
      }).finally(() => {
        context.commit('STORE_WAITING_STATUS', {type: 'login', status: false})
      })
    },
    getInitialData (context) {
      return Promise.all([
        context.dispatch('devices/getDevices', null, {root: true}),
        context.dispatch('apiKeys/getApiKeys', null, {root: true}),
        context.dispatch('localtunnel/getLocaltunnel', null, {root: true}),
        context.dispatch('settings/getSettings', null, {root: true})
      ]).finally(() => {

      })
    }
  },
  getters: {
    loggedIn: (state) => state.loggedIn,
    waiting: (state) => state.waiting
  }
}

export default globalModule

import API from '../../services/api'

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
    },
    login (context, password) {
      context.commit('STORE_WAITING_STATUS', {type: 'login', status: true})
      return context.dispatch('getAdminToken', password).then((token) => {
        API.setAdminToken(token)
        API.events.on('wrongToken', () => {
          return context.dispatch('logout')
        })
        context.commit('STORE_LOGIN_STATUS', true)
        return context.dispatch('getInitialData')
      }).finally(() => {
        context.commit('STORE_WAITING_STATUS', {type: 'login', status: false})
      })
    },
    getInitialData (context) {
      return context.dispatch('devices/getDevices', null, {root: true})
    }
  },
  getters: {
    loggedIn: (state) => state.loggedIn,
    waiting: (state) => state.waiting
  }
}

export default globalModule

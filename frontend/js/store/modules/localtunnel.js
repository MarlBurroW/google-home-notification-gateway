import API from '../../services/api'

const localtunnelModule = {
  namespaced: true,
  state: {
    localtunnel: null,
    waiting: {
      getLocaltunnel: false,
      startLocaltunnel: false,
      stopLocaltunnel: false
    }
  },
  mutations: {
    STORE_WAITING_STATUS (state, payload) {
      state.waiting[payload.type] = payload.status
    },
    STORE_LOCALTUNNEL (state, localtunnel) {
      state.localtunnel = localtunnel
    }
  },
  actions: {
    getLocaltunnel (context) {
      context.commit('STORE_WAITING_STATUS', {type: 'getLocaltunnel', status: true})
      return API.getLocaltunnel().then((localtunnel) => {
        context.commit('STORE_LOCALTUNNEL', localtunnel)
      }).finally(() => {
        context.commit('STORE_WAITING_STATUS', {type: 'getLocaltunnel', status: false})
      })
    },
    startLocaltunnel (context) {
      context.commit('STORE_WAITING_STATUS', {type: 'startLocaltunnel', status: true})
      return API.startLocaltunnel().then((localtunnel) => {
        context.commit('STORE_LOCALTUNNEL', localtunnel)
      }).finally(() => {
        context.commit('STORE_WAITING_STATUS', {type: 'startLocaltunnel', status: false})
      })
    },
    stopLocaltunnel (context) {
      context.commit('STORE_WAITING_STATUS', {type: 'stopLocaltunnel', status: true})
      return API.stopLocaltunnel().then((localtunnel) => {
        context.commit('STORE_LOCALTUNNEL', localtunnel)
      }).finally(() => {
        context.commit('STORE_WAITING_STATUS', {type: 'stopLocaltunnel', status: false})
      })
    }
  },
  getters: {
    localtunnel: (state) => state.localtunnel,
    waiting: (state) => state.waiting
  }
}

export default localtunnelModule

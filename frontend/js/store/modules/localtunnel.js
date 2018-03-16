import API from '../../services/api'

const localtunnelModule = {
  namespaced: true,
  state: {
    localtunnel: null,
    waiting: {
      getLocaltunnel: false
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
    }
  },
  getters: {}
}

export default localtunnelModule

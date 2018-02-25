import API from '../../services/api'

const globalModule = {
  namespaced: true,
  state: {
    devices: [],
    waiting: {
      getDevices: false
    }
  },
  mutations: {
    STORE_WAITING_STATUS (state, payload) {
      state.waiting[payload.type] = payload.status
    },
    STORE_DEVICES (state, devices) {
      state.devices = devices
    }
  },
  actions: {
    getDevices (context) {
      context.commit('STORE_WAITING_STATUS', {type: 'getDevices', status: true})
      return API.getDevices((devices) => {
        context.commit('STORE_DEVICES', devices)
      }).finally(() => {
        context.commit('STORE_WAITING_STATUS', {type: 'getDevices', status: false})
      })
    }
  },
  getters: {}
}

export default globalModule

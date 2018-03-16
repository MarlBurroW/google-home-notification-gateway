import API from '../../services/api'

const settingsModule = {
  namespaced: true,
  state: {
    settings: {},
    waiting: {
      getSettings: false,
      updateSettings: false
    }
  },
  mutations: {
    STORE_WAITING_STATUS (state, payload) {
      state.waiting[payload.type] = payload.status
    },
    STORE_SETTINGS (state, settings) {
      state.settings = settings
    }
  },
  actions: {
    getSettings (context) {
      context.commit('STORE_WAITING_STATUS', {type: 'getSettings', status: true})
      return API.getSettings().then((settings) => {
        context.commit('STORE_SETTINGS', settings)
      }).finally(() => {
        context.commit('STORE_WAITING_STATUS', {type: 'getSettings', status: false})
      })
    },
    updateSettings (context, settings) {
      context.commit('STORE_WAITING_STATUS', {type: 'updateSettings', status: true})
      return API.updateSettings(settings).then((settings) => {
        context.commit('STORE_SETTINGS', settings)
      }).finally(() => {
        context.commit('STORE_WAITING_STATUS', {type: 'updateSettings', status: false})
      })
    }
  },
  getters: {
    waiting: (state) => state.waiting,
    settings: (state) => state.settings
  }
}

export default settingsModule

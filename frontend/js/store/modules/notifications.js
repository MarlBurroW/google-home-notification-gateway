import API from '../../services/api'

const notificationsModule = {
  namespaced: true,
  state: {
    deviceToSendNotification: null,
    waiting: {
      sendNotification: false
    }
  },
  mutations: {
    STORE_WAITING_STATUS (state, payload) {
      state.waiting[payload.type] = payload.status
    },
    STORE_DEVICE_TO_SEND_NOTIFICATION (state, device) {
      state.deviceToSendNotification = device
    }
  },
  actions: {
    sendNotification (context, payload) {
      context.commit('STORE_WAITING_STATUS', {type: 'sendNotification', status: true})
      return API.sendNotification(payload.device, payload.options).then((result) => {
        return result
      }).finally(() => {
        context.commit('STORE_WAITING_STATUS', {type: 'sendNotification', status: false})
      })
    },
    startSendNotification (context, device) {
      context.commit('STORE_DEVICE_TO_SEND_NOTIFICATION', device)
    },
    stopSendNotification (context) {
      context.commit('STORE_DEVICE_TO_SEND_NOTIFICATION', null)
    }
  },
  getters: {
    waiting: (state) => state.waiting,
    deviceToSendNotification: (state) => state.deviceToSendNotification
  }
}

export default notificationsModule

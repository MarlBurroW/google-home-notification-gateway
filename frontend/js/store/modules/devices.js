import API from '../../services/api'
// import _ from 'lodash'

const devicesModule = {
  namespaced: true,
  state: {
    devices: [],
    deviceToCreateOrEdit: null,
    waiting: {
      getDevices: false,
      createDevice: false,
      updateDevice: false,
      removeDevice: false
    }
  },
  mutations: {
    STORE_WAITING_STATUS (state, payload) {
      state.waiting[payload.type] = payload.status
    },
    STORE_DEVICES (state, devices) {
      state.devices = devices
    },
    STORE_DEVICE_TO_CREATE_OR_EDIT (state, device) {
      state.deviceToCreateOrEdit = device
    },
    STORE_DEVICE (state, device) {
      let existingDevice = state.devices.find((deviceFound) => deviceFound.id === device.id)
      if (existingDevice) {
        existingDevice = Object.assign(existingDevice, device)
      } else {
        state.devices.push(device)
      }
    },
    REMOVE_DEVICE (state, device) {
      let deviceToDelete = state.devices.find((d) => { return d.id === device.id })
      if (deviceToDelete) {
        state.devices.splice(state.devices.indexOf(deviceToDelete), 1)
      }
    }
  },
  actions: {
    startCreateOrEditDevice (context, device) {
      context.commit('STORE_DEVICE_TO_CREATE_OR_EDIT', device)
    },
    stopCreateOrEditDevice (context) {
      context.commit('STORE_DEVICE_TO_CREATE_OR_EDIT', null)
    },
    getDevices (context) {
      context.commit('STORE_WAITING_STATUS', {type: 'getDevices', status: true})
      return API.getDevices().then((devices) => {
        context.commit('STORE_DEVICES', devices)
      }).finally(() => {
        context.commit('STORE_WAITING_STATUS', {type: 'getDevices', status: false})
      })
    },
    createDevice (context, device) {
      context.commit('STORE_WAITING_STATUS', {type: 'createDevice', status: true})
      return API.createDevice(device).then((newDevice) => {
        context.commit('STORE_DEVICE', newDevice)
      }).finally(() => {
        context.commit('STORE_WAITING_STATUS', {type: 'createDevice', status: false})
      })
    },
    updateDevice (context, device) {
      context.commit('STORE_WAITING_STATUS', {type: 'updateDevice', status: true})
      return API.updateDevice(device).then((updatedDevice) => {
        context.commit('STORE_DEVICE', updatedDevice)
      }).finally(() => {
        context.commit('STORE_WAITING_STATUS', {type: 'updateDevice', status: false})
      })
    },
    removeDevice (context, device) {
      context.commit('STORE_WAITING_STATUS', {type: 'removeDevice', status: true})
      return API.removeDevice(device).then(() => {
        context.commit('REMOVE_DEVICE', device)
      }).finally(() => {
        context.commit('STORE_WAITING_STATUS', {type: 'removeDevice', status: false})
      })
    }
  },
  getters: {
    devices: (state) => state.devices,
    waiting: (state) => state.waiting,
    deviceToCreateOrEdit: (state) => state.deviceToCreateOrEdit
  }
}

export default devicesModule

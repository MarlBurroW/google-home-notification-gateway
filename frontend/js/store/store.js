import Vue from 'vue'
import Vuex from 'Vuex'

import globalModule from './modules/global'
import devicesModule from './modules/devices'
import apiKeysModule from './modules/apikeys'
import localtunnelModule from './modules/localtunnel'
import notificationsModule from './modules/notifications'
import settingsModule from './modules/settings'
import snackbarModule from './modules/snackbar'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global: globalModule,
    devices: devicesModule,
    apiKeys: apiKeysModule,
    localtunnel: localtunnelModule,
    notifications: notificationsModule,
    settings: settingsModule,
    snackbar: snackbarModule
  }
})

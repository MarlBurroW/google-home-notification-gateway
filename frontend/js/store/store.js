import Vue from 'vue'
import Vuex from 'Vuex'

import globalModule from './modules/global'
import devicesModule from './modules/devices'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global: globalModule,
    devices: devicesModule
  }
})

// 3rd dependencies
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import 'vuetify/dist/vuetify.min.css'
import 'mdi/css/materialdesignicons.css'

// Core
import App from './vue/App.vue'
import store from './store/store.js'

// Screens
import Login from './vue/screens/Login.vue'
import Layout from './vue/screens/Layout.vue'
import Devices from './vue/screens/Devices.vue'
import Settings from './vue/screens/Settings.vue'
import ApiKeys from './vue/screens/ApiKeys.vue'
import GenerateNotification from './vue/screens/GenerateNotification.vue'

// UI Elements
import DeviceCard from './vue/components/DeviceCard.vue'
import ApiKeyCard from './vue/components/ApiKeyCard.vue'
import CreateEditDevice from './vue/components/CreateEditDevice.vue'
import CreateEditApiKey from './vue/components/CreateEditApiKey.vue'
import SendNotification from './vue/components/SendNotification.vue'
import CustomSnackbar from './vue/components/CustomSnackbar.vue'

// Components
Vue.component('login', Login)
Vue.component('layout', Layout)
Vue.component('devices', Devices)
Vue.component('settings', Settings)
Vue.component('apikeys', ApiKeys)
Vue.component('generate-notification', GenerateNotification)

Vue.component('device-card', DeviceCard)
Vue.component('apikey-card', ApiKeyCard)
Vue.component('create-edit-device', CreateEditDevice)
Vue.component('create-edit-apikey', CreateEditApiKey)
Vue.component('send-notification', SendNotification)
Vue.component('custom-snackbar', CustomSnackbar)

// Plugins
Vue.use(VueRouter)
Vue.use(Vuetify)

// Routes
const routes = [
  {path: '/', name: 'devices', component: Devices},
  {path: '/settings', name: 'settings', component: Settings},
  {path: '/apikeys', name: 'apikeys', component: ApiKeys},
  {path: '/generate-notification', name: 'generate-notification', component: GenerateNotification}
]

const router = new VueRouter({
  routes
})

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

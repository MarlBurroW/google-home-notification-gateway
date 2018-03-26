// 3rd dependencies
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import VueMoment from 'vue-moment'
import Prism from 'vue-prism-component'
import 'prismjs'
import './non-npm-packages/prism-bash.js'
import './non-npm-packages/prism-json.js'
import 'prismjs/themes/prism-okaidia.css'
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
import HowTo from './vue/screens/HowTo.vue'
import Localtunnel from './vue/screens/Localtunnel.vue'

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
Vue.component('how-to', HowTo)
Vue.component('localtunnel', Localtunnel)

Vue.component('device-card', DeviceCard)
Vue.component('apikey-card', ApiKeyCard)
Vue.component('create-edit-device', CreateEditDevice)
Vue.component('create-edit-apikey', CreateEditApiKey)
Vue.component('send-notification', SendNotification)
Vue.component('custom-snackbar', CustomSnackbar)

// 3rd party components
Vue.component('prism', Prism)

// Plugins
Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(VueMoment)

// Routes
const routes = [
  {path: '/devices', name: 'devices', component: Devices},
  {path: '/settings', name: 'settings', component: Settings},
  {path: '/apikeys', name: 'apikeys', component: ApiKeys},
  {path: '/generate-notification', name: 'generate-notification', component: HowTo},
  {path: '/localtunnel', name: 'localtunnel', component: Localtunnel},
  { path: '*', redirect: '/generate-notification' }
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

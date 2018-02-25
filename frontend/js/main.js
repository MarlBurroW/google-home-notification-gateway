// 3rd dependencies
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import 'vuetify/dist/vuetify.min.css'

// Core
import App from './vue/App.vue'
import store from './store/store.js'

// Screens
import Login from './vue/screens/Login.vue'

// Components
Vue.component('login', Login)

// Plugins
Vue.use(VueRouter)
Vue.use(Vuetify)

// Routes
const routes = []

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

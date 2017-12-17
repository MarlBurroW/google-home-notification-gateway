// 3rd dependencies
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

// Core
import App from './vue/App.vue'
import store from './store.js'

// Screens
import Login from './vue/screens/Login.vue'

// Components

// Plugins
Vue.use(VueRouter)
Vue.use(Vuetify)

// Routes
const routes = [
  { path: '/login', name: 'login', component: Login }
]

const router = new VueRouter({
  routes
})

// Starting page
router.replace({name: 'login'})

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

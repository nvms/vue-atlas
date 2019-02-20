import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Va from './index'

Vue.use(Va, 'en')
Vue.use(VueRouter)

const routes = [
  { path: '/', component: App }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

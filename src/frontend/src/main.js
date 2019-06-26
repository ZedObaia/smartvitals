import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueNativeSock from 'vue-native-websocket'
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)


Vue.config.productionTip = false

axios.defaults.baseURL = 'http://54.154.198.148/'

Vue.use(VueNativeSock, 'ws://54.154.198.148/ws/monitor/', {
  store: store,
  format: 'json',
  reconnection: true,
  reconnectionDelay: 1000,
})

Vue.component('apexchart', VueApexCharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

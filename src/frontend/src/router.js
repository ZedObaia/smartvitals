import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import History from './views/History.vue'
import NotFound from './components/NotFound.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/records/:id',
      name: 'records',
      component: History,
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    }
  ]
})

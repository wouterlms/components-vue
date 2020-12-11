import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '@/pages/index'
import examples from '@/pages/examples'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: index
  },

  {
    path: '/examples',
    component: examples
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

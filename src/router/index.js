import Vue from 'vue'
import VueRouter from 'vue-router'
import Successful from '@/views/Successful'
import SendForm from '@/views/SendForm'

Vue.use(VueRouter)

const routes = [
  {
    path: '/successful',
    name: 'Successful',
    component: Successful
  },
  {
    path: '/',
    name: 'SendForm',
    component: SendForm
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

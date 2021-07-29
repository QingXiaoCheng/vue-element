import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Mainpage from '../views/mainpage/index.vue'
import jspage from '../views/jspage/index.vue'
import csspage from '../views/css/index.vue'
import Canvas from '../views/html/canvas.vue'
import Error from '../views/error/error.vue'
import Createartical from '../views/createartical/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children:[
      {
        path: "mainpage",
        name: "mainpage",
        component:Mainpage
      },
      {
        path: 'h5',
        name: 'jspage',
        component: jspage
      },
      {
        path: 'css',
        name: 'csspage',
        component: csspage
      },
      {
        path: 'canvas',
        name: 'canvas',
        component: Canvas
      },
      {
        path: 'basicjs',
        name: 'basicjs',
        component: jspage
      },
      {
        path: 'error',
        name: 'error',
        component: Error
      },
      {
        path: 'createartical',
        name: 'createartical',
        component: Createartical
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

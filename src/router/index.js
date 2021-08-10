import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Mainpage from '../views/mainpage/index.vue'
import htmlpage from '../views/h5c3/html.vue'
import csspage from '../views/h5c3/css.vue'
import interviewh from '../views/h5c3/interview.vue'

import basicjs from '../views/jspage/basicjs.vue'
import advancejs from '../views/jspage/advancejs.vue'
import interviewj from '../views/jspage/interviewj.vue'

import interviewn from '../views/nodejs/interviewn.vue'

import interviewm from '../views/mobileweb/interviewm.vue'

import vueframe from '../views/frame/vueframe.vue'
import reactframe from '../views/frame/reactframe.vue'
import interviewv from '../views/frame/interviewv.vue'
import interviewr from '../views/frame/interviewr.vue'

import algorithm from '../views/algo/algorithm.vue'
import Createartical from '../views/createartical/index.vue'
import Login from '../views/login/login.vue'
import Tool from '../views/tool/tool.vue'

import Look from '../views/common/look.vue'
import codepage from '../views/common/codepage.vue'
import Personal from '../views/common/personal.vue'
import Error from '../views/common/error.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home, 
    redirect:'mainpage',
    children:[
      {
        path: "mainpage",
        name: "mainpage",
        component:Mainpage
      }, 
      {
        path: 'html',
        name: 'htmlpage',
        component: htmlpage
      },
      {
        path: 'css',
        name: 'csspage',
        component: csspage
      },{
        path: 'interviewh',
        name: 'interviewh',
        component: interviewh
      },
      {
        path: 'basicjs',
        name: 'basicjs',
        component: basicjs
      },
      {
        path: 'advancejs',
        name: 'advancejs',
        component: advancejs
      },
      {
        path: 'interviewj',
        name: 'interviewj',
        component: interviewj
      },
      {
        path:"interviewn",
        name:'interviewn',
        component:interviewn
      },
      {
        path:'interviewm',
        name:'interviewm',
        component:interviewm
      },
      {
        path:'vueframe',
        name:'vueframe',
        component:vueframe
      },
      {
        path:'reactframe',
        name:'reactframe',
        component: reactframe
      },
      {
        path: 'interviewv',
        name: 'interviewv',
        component: interviewv
      },
      {
        path: 'interviewr',
        name: 'interviewr',
        component: interviewr
      },
      {
        path: 'algorithm',
        name:'algorithm',
        component: algorithm
      },
      {
        path:'tool',
        name:'tool',
        component:Tool
      },
      {
        path: 'createartical',
        name: 'createartical',
        component: Createartical
      },
      {
        path: 'error',
        name: 'error',
        component: Error
      },
      {
        path: 'codepage',
        name: 'codepage',
        component:codepage
      },
      {
        path: 'personal',
        name:'personal',
        component: Personal
      }
    ]
  },
  {
    path: 'look',
    name: 'look',
    component: Look
  }
  
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router

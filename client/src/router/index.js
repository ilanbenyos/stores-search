import Vue from 'vue'

//import { Carousel3d, Slide } from 'vue-carousel-3d';
//import ElementUI from 'element-ui'


import Router from 'vue-router'
import Splash from '@/pages/Splash'
import Branches from '@/pages/branches'
import Shops from '@/pages/shops'
import User from '@/pages/user'



Vue.use(Router)
//Vue.use(Carousel3d)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Splash',
      component: Splash
    },{
      path: '/branches',//
      name: 'Branches',
      component: Branches
    },{
      path: '/shops',//
      name: 'Shops',
      component: Shops
    },{
      path: '/user',//
      name: 'User',
      component: User
    },

  ]
})

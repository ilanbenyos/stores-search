import Vue from 'vue'

//import { Carousel3d, Slide } from 'vue-carousel-3d';
//import ElementUI from 'element-ui'
import Router from 'vue-router'
import Splash from '@/pages/Splash'
import Login from '@/pages/Login'
import Oxygen from '@/components/exams/Oxygen'
import Grading from '@/components/exams/Grading'
import Facilities from '@/components/exams/Facilities'
import Graders from '@/components/exams/Graders'
import Fishes from '@/components/exams/Fishes'
import Ponds from '@/components/exams/Ponds'
import Gmap from '@/components/exams/Gmap'
import Ex from '@/components/exams/Ex'
import Branches from '@/components/exams/Branches'
import Shops from '@/components/exams/Shops'
import User from '@/components/exams/user'
// import Grading from '@/components/exams/Grading'
// import Grading from '@/components/exams/Grading'
// import Grading from '@/components/exams/Grading'



Vue.use(Router)
//Vue.use(Carousel3d)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Splash',
      component: Splash
    },{
      path: '/Ex',
      name: 'Ex',
      component: Ex
    },{
      path: '/user',
      name: 'User',
      component: User
    },{
      path: '/gmap',
      name: 'Gmap',
      component: Gmap
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/oxygen',
      name: 'Oxygen',
      component: Oxygen
    },{
      path: '/grading',
      name: 'Grading',
      component: Grading
    },{
      path: '/graders',
      name: 'Graders',
      component: Graders
    },{
      path: '/facilities',
      name: 'Facilities',
      component: Facilities
    },{
      path: '/fishes',
      name: 'Fishes',
      component: Fishes
    },{
      path: '/branches',//
      name: 'Branches',
      component: Branches
    },{
      path: '/shops',//
      name: 'Shops',
      component: Shops
    },{
      path: '/ponds',//
      name: 'Ponds',
      component: Ponds
    },

  ]
})

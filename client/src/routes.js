import About from '@/views/About.vue'
export default [
    {
      path: '/',
      name: 'landing',
      component: () => import(/* webpackChunkName: "landing" */'./views/Landing.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    //   component: About
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "signup" */ './views/SignUp.vue')
    },
    {
      path: '/groups/:id',
      name: 'groups',
      component: () => import(/* webpackChunkName: "groups" */ './views/Groups.vue')
    },
    {
      path: '/group/:id',
      name: 'group',
      component: () => import(/* webpackChunkName: "group" */ './views/Group.vue')
    },
    {
      path: '/member/:id',
      name: 'member',
      component: () => import(/* webpackChunkName: "member" */ './views/Member.vue')
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue')
    },
   
  ]

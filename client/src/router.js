import Vue from 'vue'
import Router from 'vue-router'
import Groups from './views/Groups.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/groups/:id',
      name: 'groups',
      component: Groups
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

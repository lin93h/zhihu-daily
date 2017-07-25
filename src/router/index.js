import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import theme from '@/components/theme-page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/theme/:id',
      name: 'themes',
      component: theme
    }
  ]
})

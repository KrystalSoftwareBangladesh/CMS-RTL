import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: HomeView,
    },
    {
      path: '/services',
      name: 'services',
      component: HomeView,
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: HomeView,
    },
    {
      path: '/news',
      name: 'news',
      component: HomeView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: HomeView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router

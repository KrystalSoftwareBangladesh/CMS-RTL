import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ServicesView from '../views/ServicesView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import NewsView from '../views/NewsView.vue'
import ContactView from '../views/ContactView.vue'
import FAQsView from '../views/FAQsView.vue'
import NotFoundView from '../views/NotFoundView.vue'

import AdminLogin from '../views/admin/AdminLogin.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import AdminServices from '../views/admin/AdminServices.vue'
import AdminNews from '../views/admin/AdminNews.vue'
import AdminProjects from '../views/admin/AdminProjects.vue'
import AdminTestimonials from '../views/admin/AdminTestimonials.vue'
import AdminFAQ from '../views/admin/AdminFAQ.vue'
import AdminSettings from '../views/admin/AdminSettings.vue'
import AdminProfile from '../views/admin/AdminProfile.vue'
import AdminCategories from '../views/admin/AdminCategories.vue'
import { getAccessToken } from '@/services/api'

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
      component: AboutView,
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesView,
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioView,
    },
    {
      path: '/news',
      name: 'news',
      component: NewsView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/faqs',
      name: 'faqs',
      component: FAQsView,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLogin,
    },
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/services',
      name: 'admin-services',
      component: AdminServices,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/news',
      name: 'admin-news',
      component: AdminNews,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/projects',
      name: 'admin-projects',
      component: AdminProjects,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/testimonials',
      name: 'admin-testimonials',
      component: AdminTestimonials,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/faq',
      name: 'admin-faq',
      component: AdminFAQ,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/settings',
      name: 'admin-settings',
      component: AdminSettings,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/profile',
      name: 'admin-profile',
      component: AdminProfile,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/categories',
      name: 'admin-categories',
      component: AdminCategories,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!getAccessToken()
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/admin/login')
  } else if (to.path === '/admin/login' && isAuthenticated) {
    next('/admin')
  } else {
    next()
  }
})

export default router

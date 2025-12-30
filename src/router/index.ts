import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ServicesView from '../views/ServicesView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import NewsView from '../views/NewsView.vue'
import ContactView from '../views/ContactView.vue'

import AdminDashboard from '../views/admin/AdminDashboard.vue'
import AdminServices from '../views/admin/AdminServices.vue'
import AdminNews from '../views/admin/AdminNews.vue'
import AdminProjects from '../views/admin/AdminProjects.vue'
import AdminTestimonials from '../views/admin/AdminTestimonials.vue'
import AdminFAQ from '../views/admin/AdminFAQ.vue'
import AdminSettings from '../views/admin/AdminSettings.vue'

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
      path: '/admin',
      name: 'admin-dashboard',
      component: AdminDashboard,
    },
    {
      path: '/admin/services',
      name: 'admin-services',
      component: AdminServices,
    },
    {
      path: '/admin/news',
      name: 'admin-news',
      component: AdminNews,
    },
    {
      path: '/admin/projects',
      name: 'admin-projects',
      component: AdminProjects,
    },
    {
      path: '/admin/testimonials',
      name: 'admin-testimonials',
      component: AdminTestimonials,
    },
    {
      path: '/admin/faq',
      name: 'admin-faq',
      component: AdminFAQ,
    },
    {
      path: '/admin/settings',
      name: 'admin-settings',
      component: AdminSettings,
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

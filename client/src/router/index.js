import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/forums',
    name: 'forums',
    component: () => import('../views/ForumsView.vue')
  },
  {
    path: '/create/post',
    name: 'CreateForumPost',
    component: () => import('../views/CreateForumPost.vue'),
    beforeEnter: (to, from, next) => {
      if (useAuthStore().isAuthenticated) {
        next()
      } else {
        router.push('/')
      }
    }
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('../views/EventsView.vue')
  },
  {
    path: '/fields',
    name: 'fields',
    component: () => import('../views/FieldsView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: (to, from, next) => {
      localStorage.removeItem("auth")
      useAuthStore().logoutUser()
      router.push('/')
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

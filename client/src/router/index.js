import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/privacy',
      name: 'Privacy Policy',
      component: () => import('../views/PrivacyPolicy.vue')
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
      // beforeEnter: (to, from, next) => {
      //   if (useAuthStore().isAuthenticated) {
      //     next()
      //   } else {
      //     router.push('/')
      //   }
      // }
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
      path: '/view/post/:postID',
      name: 'Post View',
      component: () => import('../views/ViewPost.vue')
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
})
// router.beforeEach(async (to, from, next) => {
//   const isValid = await useAuthStore().validate();

//   switch (to.name) {
//     case "Login":
//       if (isValid) return next({name: from.name})
//       else next()
//       break;
//     case "Forgot Password":
//       if (isValid) return next({name: from.name})
//       else next()
//       break;
//     case "Enroll MFA":
//       if (!isValid) return next({name: from.name})
//       else next()
//       break;
//     default:
//       next()
//       break;
//   }
// });
export default router

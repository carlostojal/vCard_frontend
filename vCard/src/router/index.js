import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import LoginVcard from '../views/loginVcard.vue'
import Register from '../views/register.vue'
import vCard from '../views/createVCard.vue'
import Home from '../views/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'base',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: LoginVcard
    },
    {
      path: '/loginAdmin',
      name: 'loginAdmin',
      component: Login 
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/vcard',
      name: 'vcard',
      component: vCard
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})

export default router

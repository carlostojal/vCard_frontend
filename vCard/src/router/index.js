import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import LoginVcard from '../views/loginVcard.vue'
import Register from '../views/register.vue'
import vCard from '../views/createVCard.vue'
import Home from '../views/home.vue'
import Transfer from '../views/transfer.vue'
import Profile from '../views/profile.vue'
import Transactions from '../views/transactions_list.vue'
import Admins from '../views/admin/adminsList.vue'
import vCards from '../views/admin/vcardList.vue'
import AllTransactions from '../views/admin/transactionsList.vue'
import AddAdmin from '../views/admin/addAdmin.vue'
import AllCategories from '../views/admin/categoriesList.vue'
import AddCategorie from '../views/admin/addCategorie.vue'

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
      component: vCard,
      meta: { requiredVcard: false }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { requiredVcard: true }
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: Transfer,
      meta: { requiredVcard: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiredVcard: true},
    },
    {
      path: '/myTransactions',
      name: 'transactions',
      component: Transactions,
      meta: { requiredVcard: true }
    },
    {
      //ADMIN
      path: '/admins',
      name: 'admins',
      component: Admins
      //meta: { requiredVcard: true},
    },
    {
      //ADMIN
      path: '/vcards',
      name: 'vcards',
      component: vCards
      //meta: { requiredVcard: true},
    },
    {
      //ADMIN
      path: '/allTransactions',
      name: 'allTransactions',
      component: AllTransactions
      //meta: { requiredVcard: true},
    },
    {
      //ADMIN
      path: '/addAdmin',
      name: 'addAdmin',
      component: AddAdmin
    },
    {
      //ADMIN
      path: '/allCategories',
      name: 'allCategories',
      component: AllCategories
      //meta: { requiredVcard: true},
    },
    {
      path: '/addCategorie',
      name: 'addCategorie',
      component: AddCategorie
      //meta: { requiredVcard: true},
    },
  ]
})

export default router

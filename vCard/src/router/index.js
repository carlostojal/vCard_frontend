import { createRouter, createWebHistory } from 'vue-router'
import LoginAdmin from '../views/loginAdmin.vue'
import LoginVcard from '../views/loginVcard.vue'
import Register from '../views/register.vue'
import vCard from '../views/createVCard.vue'
import Home from '../views/home.vue'
import HomeAdmin from '../views/admin/home.vue'
import CreditForm from '../views/admin/credit.vue'
import Transfer from '../views/transfer.vue'
import Profile from '../views/profile.vue'
import Transactions from '../views/transactions_list.vue'
import Admins from '../views/admin/adminsList.vue'
import vCards from '../views/admin/vcardList.vue'
import Statistics from '../views/statistics.vue'
import AllTransactions from '../views/admin/transactionsList.vue'
import AddAdmin from '../views/admin/addAdmin.vue'
import AllCategories from '../views/admin/categoriesList.vue'
import AddCategory from '../views/admin/addCategory.vue'
import MyCategories from '../views/myCategories.vue'
import AdminStatistics from '../views/admin/statistics.vue'
import DeleteOwnVcard from '../views/deleteOwnVcard.vue'
import AddCategoryVcard from '../views/addCategoryVcard.vue'
import EditTransaction from '../views/editTransaction.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'base',
      component: LoginVcard
    },
    {
      path: '/login',
      name: 'login',
      component: LoginVcard
    },
    {
      path: '/admin',
      name: 'admin',
      component: LoginAdmin
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
        path: '/admin/home',
        name: 'admin/home',
        component: HomeAdmin,
        meta: { requiredAdmin: true}
    },
    {
        path: '/admin/credit',
        name: 'admin/credit',
        component: CreditForm,
        meta: { requiredAdmin: true}
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
      path: '/statistics',
      name: 'statistics',
      component: Statistics,
      meta: { requiredVcard: true},
    },
    {
      path: '/myTransactions',
      name: 'transactions',
      component: Transactions,
      meta: { requiredVcard: true }
    },
    {
      path: '/admins',
      name: 'admins',
      component: Admins,
      meta: { requiredAdmin: true},
    },
    {
      path: '/vcards',
      name: 'vcards',
      component: vCards,
      meta: { requiredAdmin: true},
    },
    {
      path: '/allTransactions',
      name: 'allTransactions',
      component: AllTransactions,
      meta: { requiredAdmin: true},
    },
    {
      path: '/addAdmin',
      name: 'addAdmin',
      component: AddAdmin,
      meta: { requiredAdmin: true},
    },
    {
      path: '/allCategories',
      name: 'allCategories',
      component: AllCategories,
      meta: { requiredAdmin: true},
    },
    {
      path: '/addCategory',
      name: 'addCategory',
      component: AddCategory,
      meta: { requiredAdmin: true},
    },
    {
      path: '/myCategories',
      name: 'myCategories',
      component: MyCategories,
      meta: { requiredVcard: true},
    },
    {
      path: '/seeStatistics',
      name: 'seeStatistics',
      component: AdminStatistics,
      meta: { requiredAdmin: true},
    },
    {
      path: '/deleteOwnVcard',
      name: 'deleteOwnVcard',
      component: DeleteOwnVcard,
      meta: { requiredVcard: true},
    },
    {
      path: '/addCategoryVcard',
      name: 'addCategoryVcard',
      component: AddCategoryVcard,
      meta: { requiredVcard: true},
    },
    {
      path: '/editTransaction/:id',
      name: 'editTransaction',
      component: EditTransaction,
      meta: { requiredVcard: true},
      //props: route => ({ data: JSON.parse(route.query.data) }),
      props: route => ({ id: route.params.id })
    }
  ]
})

export default router

//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css' 

import "bootstrap/dist/css/bootstrap.min.css" 
import "bootstrap" 

import App from './App.vue'
import router from './router'
import { useUserStore } from '@/stores/user'

const app = createApp(App)

app.use(createPinia())
app.use(Toast)
app.use(router)

app.mount('#app')

const userStore = useUserStore();

router.beforeEach(async (to, from, next) => {
    if (userStore.token == null && to.name !== 'login' && to.name !== 'loginAdmin' && to.name !== 'register') {
        next({ name: 'login' })
    }else {
        next();
    }
});



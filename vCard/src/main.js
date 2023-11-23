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
    const userRole = await userStore.getAuthGuard()
    if(to.meta.requiredVcard && userRole == 'vcards'){
        next();
    }else if(to.meta.requiredAdmin && userRole == 'users'){
        next();
    }else if (to.name !== 'login' && to.name !== 'vcard' && to.name !== 'loginAdmin' && to.name !== 'register') {
        next({ name: 'login' });
    }else if (to.name == 'login' && userRole == 'vcards') {
        next({ name: 'home' })
    }else next();

});



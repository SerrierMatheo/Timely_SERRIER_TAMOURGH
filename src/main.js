import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import ApiPlugins from './plugins/api.js'
import router from './router/index.js'

import toast from './plugins/toast'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
pinia.use(piniaPersist)

import { useAuthStore } from "@/stores/authStore.js";
const authStore = useAuthStore();

import { useWorkTimeStore } from "@/stores/workTimeStore.js";
const workTimeStore = useWorkTimeStore();

app.use(ApiPlugins, {
    baseURL: 'https://timely.edu.netlor.fr/',
    apiKey: authStore.apikey
})

app.use(toast)

app.use(router)

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!authStore.apikey) {
            next({
                path: '/auth/login',
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
    } else {
        next();
    }
});


app.mount('#app')

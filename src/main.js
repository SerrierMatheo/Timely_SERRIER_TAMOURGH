import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import ApiPlugins from './plugins/api.js'
import router from './router/index.js'

const app = createApp(App)

app.use(ApiPlugins, {
    baseURL: 'https://timely.edu.netlor.fr/',
    apiKey: '@+8)T$i#v]4H'
})

const pinia = createPinia()
app.use(pinia)
pinia.use(piniaPersist)

app.use(router)

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // Check if user is authenticated, redirect to login if not
        if (!app.apiKey) {
            next({
                path: '/connexion',
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
    } else {
        next(); // Allow access to non-restricted routes
    }
});


app.mount('#app')

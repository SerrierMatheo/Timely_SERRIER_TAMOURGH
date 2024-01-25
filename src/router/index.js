import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfilView from '../views/ProfilView.vue'
import ActiviteView from '../views/ActiviteView.vue'
import ConnexionView from '@/views/ConnexionView.vue'
import InscriptionView from '@/views/InscriptionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profil',
      name: 'profil',
      component: ProfilView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/activite',
      name: 'activite',
      component: ActiviteView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: ConnexionView
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: InscriptionView
    }
  ]
})

export default router
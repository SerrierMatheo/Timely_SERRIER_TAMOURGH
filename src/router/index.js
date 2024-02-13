import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ParametreView from "@/views/ParametreView.vue";
import ConnexionView from '../views/ConnexionView.vue'
import InscriptionView from '../views/InscriptionView.vue'
import AuthView from "../views/AuthView.vue";
import LogoutVue from '../components/Logout.vue'
import StatistiquesView from "@/views/StatistiquesView.vue";

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
      path: '/params',
      name: 'parametre',
      component: ParametreView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/statistiques',
      name: 'statistiques',
      component: StatistiquesView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      children: [
        {
          path: 'login',
          name: 'auth/login',
          component: ConnexionView,
        },
        {
          path: '/logout',
          name: 'logout',
          component: LogoutVue,
        },
        {
          path: 'register',
          name: 'auth/register',
          component: InscriptionView,
        },
      ],
    },
  ]
})

export default router

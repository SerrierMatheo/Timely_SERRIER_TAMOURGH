import { createRouter, createWebHistory } from 'vue-router'
import ParametreView from "@/views/ParametreView.vue";
import ConnexionView from '../views/ConnexionView.vue'
import InscriptionView from '../views/InscriptionView.vue'
import AuthView from "../views/AuthView.vue";
import LogoutVue from '../components/Logout.vue'
import StatistiquesView from "@/views/StatistiquesView.vue";
import test from "@/views/test.vue";
import Home from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/test',
      name: 'test',
      component: test,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
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

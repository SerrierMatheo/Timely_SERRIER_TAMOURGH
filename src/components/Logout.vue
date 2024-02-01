<script>
import { ref } from 'vue';
import router from '@/router/index.js';
import {mapState, mapActions} from "pinia";
import {useAuthStore} from "@/stores/authStore.js";

const apikey = ref('');

const logout = () => {
  this.$api.delete('api/profile', {
        name: null,
        email: null
      })
  localStorage.removeItem('apikey'); // (Optionnel) Supprimer du stockage local
  router.push('/'); // Redirection vers l'accueil après déconnexion
};

export default {
  methods: {
    logout,
  },
};
</script>
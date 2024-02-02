<script>
import { useAuthStore } from '@/stores/authStore.js';

export default {
  methods: {
    logout() {
      const authStore = useAuthStore();
      authStore.removeApikey();
      // Redirection facultative vers une autre route après la déconnexion
      this.$router.push('/');
    }
  }
}
</script>

<template>
  <div class="itm"> 
  <h3>Voulez-vous vraiment vous déconnecter?</h3>
  <button @click="logout" class="btn"><span class="text">Deconnexion</span></button>
  </div>
</template>

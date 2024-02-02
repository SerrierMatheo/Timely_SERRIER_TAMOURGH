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
  <div class="form"> 
  <h3>Voulez-vous vraiment vous déconnecter?</h3>
  </div>
  <div class="form">
  <input @click="logout" value="Deconnexion" class="btn" type="submit">
  </div>
</template>

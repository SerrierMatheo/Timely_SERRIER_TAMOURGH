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
  <button @click="logout">Déconnexion</button>
</template>

<script>
import { useAuthStore } from "@/stores/authStore.js";
const authStore = useAuthStore()

export default {
  data() {
    return {
      key: authStore.apikey
    }
  }
}
</script>

<template>
    <h2>Profil</h2>
    <h3>Mon token : {{ this.key }}</h3>
</template>

<style scoped>

</style>
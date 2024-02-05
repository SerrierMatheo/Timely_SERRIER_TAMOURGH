<script>

import {useAuthStore} from "@/stores/authStore.js";

export default {
  data() {
    return {
      key: useAuthStore().apikey
    }
  }
}
</script>

<template>
    <h2 class="day-text">Profil</h2>
    <h3 class="day-text">Mon token : {{ this.key }}</h3>
</template>

<style scoped>

</style>
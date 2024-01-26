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
    <h2>Profil</h2>
    <h3>Mon token : {{ this.key }}</h3>
</template>

<style scoped>

</style>
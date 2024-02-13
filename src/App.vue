<script setup>
import { RouterView } from 'vue-router';
import Header from "@/components/Header.vue"; // Assurez-vous d'avoir le bon chemin vers le composant Header

</script>

<template>
  <div class="wrapper">
    <Header />

  <main class="content">
    <RouterView />
  </main>
</div>

</template>

<style scoped>
</style>

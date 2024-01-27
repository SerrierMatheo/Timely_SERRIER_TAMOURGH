<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

  <div class="wrapper">
    
  <header>
    
      <nav class="side">
        <RouterLink to="/"><img src="./assets/icone.png" style="width: 100px;height: auto;"></RouterLink>
        <RouterLink to="/Profil">Profil</RouterLink>
        <RouterLink to="/Activite">Activite</RouterLink>
      </nav>
    
  </header>
  <main class="content">
  <RouterView />
  </main>
</div>

</template>

<style scoped>

</style>

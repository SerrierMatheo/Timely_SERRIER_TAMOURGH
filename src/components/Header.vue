<template>
  <header>
    <nav class="side">
      <RouterLink to="/"><img src="../assets/icone.png" style="width: 100px;height: auto;"></RouterLink>
      <RouterLink to="/Params">Paramètres généraux</RouterLink>
      <RouterLink to="/Statistiques">Statistiques</RouterLink>
      <router-link to="/logout"><div class="deco">Déconnexion</div></router-link>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
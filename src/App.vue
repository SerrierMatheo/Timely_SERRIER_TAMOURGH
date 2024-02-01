<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';
import router from '@/router/index.js';


</script>

<template>
  <div class="wrapper">  
    <header>
        <nav class="side">
          <RouterLink to="/"><img src="./assets/icone.png" style="width: 100px;height: auto;"></RouterLink>
          <RouterLink to="/Profil">Profil</RouterLink>
          <RouterLink to="/Activite">Activite</RouterLink>
          <router-link to="/"><div class="deco">Déconnexion</div></router-link>
        </nav>
    </header>

  <main class="content">
  <RouterView />
  </main>
</div>

</template>






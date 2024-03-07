<template>
  <header>
    <nav class="side">
      <RouterLink to="/"><img src="../assets/icone.png" style="width: 100px;height: auto;"></RouterLink>
      <RouterLink to="/Settings">Paramètres généraux</RouterLink>
      <RouterLink to="/Statistiques">Statistiques</RouterLink>
      <div>{{this.worktime}}</div>
      <RouterLink to="/logout"><div class="deco">Déconnexion</div></RouterLink>
    </nav>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router';
import {useWorkTimeStore} from "@/stores/workTimeStore.js";

export default {
  data() {
    return {
      worktime: useWorkTimeStore().workTime,
    };
  },
}
</script>
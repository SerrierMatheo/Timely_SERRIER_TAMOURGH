<template>
  <header>
    <nav class="side">
      <RouterLink to="/"><img src="../assets/icone.png" style="width: 80px;height: auto;"></RouterLink>
      <RouterLink to="/Settings">Paramètres généraux</RouterLink>
      <RouterLink to="/Statistiques">Statistiques</RouterLink>
      <div>Temps totale travaillé : {{ formattedWorkTime }}</div>
      <RouterLink to="/logout"><div class="deco">Déconnexion</div></RouterLink>
    </nav>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useWorkTimeStore } from "@/stores/workTimeStore.js";

export default {
  data() {
    return {
      worktime: useWorkTimeStore().workTime,
    };
  },
  computed: {
    formattedWorkTime() {
      return this.formatTime(this.worktime);
    },
  },
  methods: {
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
    },
    pad(value) {
      return value.toString().padStart(2, '0');
    },
  },
};
</script>

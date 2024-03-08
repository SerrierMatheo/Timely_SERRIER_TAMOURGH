<template>
  <header>
    <nav class="side">
      <RouterLink to="/"><img src="../assets/icone.png" style="width: 80px;height: auto;"></RouterLink>
      <RouterLink to="/Settings">Paramètres généraux</RouterLink>
      <RouterLink to="/Statistiques">Statistiques</RouterLink>
      <div>Temps total travaillé : {{ formattedWorkTime() }}</div>
      <div v-if="lastEntry()">Activité en cours : {{ lastEntry() }}</div>
      <div v-else>Aucune activité en cours</div>
      <RouterLink to="/logout"><div class="deco">Déconnexion</div></RouterLink>
    </nav>
  </header>
</template>

<script>
import { useWorkTimeStore } from "@/stores/workTimeStore.js";
import { useEntryStore } from "@/stores/entryStore.js";

export default {
  methods: {
    formattedWorkTime() {
      return this.formatTime(useWorkTimeStore().workTime);
    },
    lastEntry() {
      return useEntryStore().lastEntry;
    },
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

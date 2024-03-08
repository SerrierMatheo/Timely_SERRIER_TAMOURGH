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

import { timeFormatMixin } from "@/components/timeFormatMixin.vue";

export default {
  mixins: [timeFormatMixin],
  methods: {
    formattedWorkTime() {
      return this.formatTime(useWorkTimeStore().workTime);
    },
    lastEntry() {
      return useEntryStore().lastEntry;
    },
  },
};
</script>

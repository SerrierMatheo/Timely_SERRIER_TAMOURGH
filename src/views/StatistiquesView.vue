<template>
  <div class="reporting">
    <h2>Reporting / Statistiques</h2>

    <!-- Filtres de date -->
    <div>
      <label for="startDate">Du:</label>
      <input type="date" id="startDate" v-model="startDate" required />

      <label for="endDate">Au:</label>
      <input type="date" id="endDate" v-model="endDate" required />

      <button @click="generateReport">Générer le rapport</button>
    </div>

    <!-- Filtre de projet (optionnel) -->
    <div v-if="showProjectFilter">
      <label for="projectFilter">Projet:</label>
      <select id="projectFilter" v-model="selectedProject">
        <option value="" disabled>Sélectionner un projet</option>
        <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
      </select>
    </div>

    <!-- Statistiques générales -->
    <div v-if="reportGenerated">
      <p>Temps total travaillé: {{ totalTimeWorked }} heures</p>
      <p>Nombre de projets concernés: {{ numberOfProjects }}</p>
    </div>

    <!-- Graphique par projet -->
    <div v-if="reportGenerated && !selectedProject">
      <canvas id="projectChart"></canvas>
    </div>

    <!-- Graphique par type d'activité -->
    <div v-if="reportGenerated && !selectedProject">
      <canvas id="activityChart"></canvas>
    </div>

    <!-- Liste des entrées triées par ordre chronologique -->
    <div v-if="reportGenerated">
      <h3>Logs des time-entries:</h3>
      <ul>
        <li v-for="entry in sortedTimeEntries" :key="entry.id">
          {{ entry.date }} - {{ entry.projectName }} - {{ entry.activityName }} - {{ entry.duration }} heures
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      selectedProject: '',
      showProjectFilter: true,
      projects: [], // Remplacez par la liste des projets récupérée de l'API
      timeEntries: [], // Remplacez par la liste des time-entries récupérée de l'API
      reportGenerated: false,
    };
  },
};
</script>

<style scoped>
/* Ajoutez du style si nécessaire */
</style>
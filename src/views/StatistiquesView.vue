<template>
  <div class="reporting">
    <h2>Reporting / Statistiques</h2>

    <!-- Filtres de date -->
    <div>
      <form class="formulaire">
      <label for="startDate">Du:</label>
      <input type="date" id="startDate" v-model="startDate" required />

      <label for="endDate">Au:</label>
      <input type="date" id="endDate" v-model="endDate" required />

      <button @click="generateReport" class="btn">Générer le rapport</button>
    </form>
    </div>

    <!-- Filtre de projet (optionnel) -->
    <div v-if="showProjectFilter">
      <form class="formulaire">
      <label for="projectFilter">Projet:</label>
      <select id="projectFilter" v-model="selectedProject">
        <option value="" disabled>Sélectionner un projet</option>
        <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
      </select>
    </form>
    </div>

    <!-- Statistiques générales -->
    <div v-if="reportGenerated && !selectedProject">
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
import Chart from 'chart.js/auto';

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
  computed: {
    filteredTimeEntries() {
      // Appliquer les filtres de date et de projet
      // Retourner la liste filtrée
    },
    totalTimeWorked() {
      // Calculer le temps total travaillé sur la période
    },
    numberOfProjects() {
      // Calculer le nombre de projets concernés
    },
    sortedTimeEntries() {
      // Trier les time-entries par ordre chronologique
      return this.timeEntries.sort((a, b) => new Date(a.date) - new Date(b.date));
    },
  },
  watch: {
    selectedProject() {
      this.generateReport();
    },
  },
  methods: {
    async generateReport() {
      // Générer le rapport en utilisant les données filtrées
      // Mettre à jour les données nécessaires pour les statistiques et graphiques
      this.generateProjectChart();
      this.generateActivityChart();
      this.reportGenerated = true;
    },
    generateProjectChart() {
      // Utiliser Chart.js pour générer le graphique par projet
      // Utiliser les données nécessaires (projets, temps travaillé par projet)
      const ctx = document.getElementById('projectChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.projects.map(project => project.name),
          datasets: [{
            label: 'Temps travaillé par projet',
            data: this.calculateTimeByProject(),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },

    generateActivityChart() {
      // Utiliser Chart.js pour générer le graphique par type d'activité
      // Utiliser les données nécessaires (activités, temps travaillé par activité)
      const ctx = document.getElementById('activityChart').getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.activities.map(activity => activity.name),
          datasets: [{
            label: 'Temps travaillé par activité',
            data: this.calculateTimeByActivity(),
            backgroundColor: this.activities.map(activity => activity.color),
            hoverOffset: 4,
          }],
        },
      });
    },

    // Méthode pour calculer le temps travaillé par projet
    calculateTimeByProject() {
      // Implémentez la logique pour calculer le temps travaillé par projet sur la période sélectionnée
      // Utilisez les données de timeEntries
    },

    // Méthode pour calculer le temps travaillé par activité
    calculateTimeByActivity() {
      // Implémentez la logique pour calculer le temps travaillé par activité sur la période sélectionnée
      // Utilisez les données de timeEntries
    },
  },
  async mounted() {
    // Appels API pour récupérer les projets et les time-entries
    try {
      const projectsResponse = await this.$api.get('api/projects');
      this.projects = projectsResponse.data;

      const timeEntriesResponse = await this.$api.get('api/time-entries');
      this.timeEntries = timeEntriesResponse.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  },
};
</script>

<style scoped>

h2{
  text-align: center;
}

label{
    margin-bottom: 1em;
  }
  input,select{
    margin-bottom: 1em;
    background-color: rgb(76, 76, 76);
    color: white;
    border: none;
    border-radius: 0.5em;
    padding: 0.5em;
  }
  form.formulaire {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 2em;
    margin-left: auto;
    margin-right: auto;

  }
</style>

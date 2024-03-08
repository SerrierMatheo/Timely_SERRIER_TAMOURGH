<template>
  <div>
    <h2>Reporting / Statistiques</h2>

    <label for="startDate">Du :</label>
    <input type="date" id="startDate" v-model="startDate" required />

    <label for="endDate">Au :</label>
    <input type="date" id="endDate" v-model="endDate" required />

    <button @click="applyFilters">Appliquer</button>

    <p>Temps total travaillé sur la période : {{ formattedTotalTime }}</p>

    <canvas id="timeDistributionChart"></canvas>

    <p>Nombre de projets concernés : {{ projectsCount }}</p>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      timeEntries: [],
      projects: [],
    };
  },
  computed: {
    formattedTotalTime() {
      const totalTime = this.calculateTotalTime();
      return this.formatTime(totalTime);
    },
    projectsCount() {
      return this.calculateProjectsCount();
    },
  },
  methods: {
    async applyFilters() {
      await this.fetchProjectsAndActivities();
      await this.fetchTimeEntries();

      const filteredTimeEntries = this.timeEntries.filter(entry => {
        const entryDate = new Date(entry.start_time);
        return entryDate >= new Date(this.startDate) && entryDate <= new Date(this.endDate);
      });

      this.timeEntries = filteredTimeEntries;
      this.updateChart();
    },
    async fetchProjectsAndActivities() {
      try {
        const projectsResponse = await this.$api.get('api/projects');
        this.projects = projectsResponse.data;

        const activitiesResponse = await this.$api.get('api/activities');
        this.activities = activitiesResponse.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    },
    async fetchTimeEntries() {
      try {
        const response = await this.$api.get('api/time-entries');
        const entries = response.data;

        const projectsResponse = await this.$api.get('api/projects');
        const activitiesResponse = await this.$api.get('api/activities');
        const projectsMap = projectsResponse.data.reduce((map, project) => {
          map[project.id] = project.name;
          return map;
        }, {});
        const activitiesMap = activitiesResponse.data.reduce((map, activity) => {
          map[activity.id] = activity.name;
          return map;
        }, {});

        this.timeEntries = entries.map(entry => ({
          ...entry,
          projectName: projectsMap[entry.project_id],
          activityName: activitiesMap[entry.activity_id],
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des entrées:', error);
      }
    },
    calculateTotalTime() {
      return this.timeEntries.reduce((total, entry) => total + entry.duration, 0);
    },
    calculateProjectsCount() {
      return new Set(this.timeEntries.map(entry => entry.project_id)).size;
    },
    updateChart() {
      const ctx = document.getElementById('timeDistributionChart').getContext('2d');

      const projectLabels = Array.from(new Set(this.timeEntries.map(entry => entry.projectName)));
      const timeData = projectLabels.map(projectName =>
          this.timeEntries
              .filter(entry => entry.projectName === projectName)
              .reduce((total, entry) => total + entry.duration, 0)
      );

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: projectLabels,
          datasets: [
            {
              label: 'Temps travaillé par projet',
              data: timeData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
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

<style>
</style>

<template>
  <div class="activite">
    <h2>Activité (page d’accueil)</h2>

    <div class="forms-container">
    <!-- Time Tracker -->
      <form class="formulaire">
      <h3>Time Tracker</h3>
      
      <div v-if="!isActivityRunning">
        <label for="project">Projet :</label>
        <br>
        <select id="project" v-model="selectedProject">
          <option value="" disabled>Sélectionner un projet</option>
          <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
        </select>
        <br>
        <label for="activity">Type d'activité :</label>
        <br>
        <select id="activity" v-model="selectedActivity">
          <option value="" disabled>Sélectionner un type d'activité</option>
          
          <option v-for="activity in activities" :key="activity.id" :value="activity.id">{{ activity.name }}</option>
        </select>
        <br><br>
        <button @click="startEntry" class="manual">Démarrer l'activité</button>
      </div>
    
      <div v-else>
        <p>Activité en cours : {{ runningActivity.activity.name }}</p>
        <p>Temps écoulé : {{ formatElapsedTime }}</p>
        <textarea v-model="entryNotes" placeholder="Notes sur l'activité (Markdown)"></textarea>
        <button @click="stopEntry" class="manual">Arrêter l'activité</button>
      </div>
    </form>

  
    <!-- Liste des activités réalisées -->
    <div class="form-container">
    <form class="formulaire">
    <div>
      
      <h3>Activités réalisées ce jour</h3>

      <!-- Filtres facultatifs -->
      <div class="filters">
        <form classe="formulaire">
        <label for="projectFilter">Filtrer par projet :</label>
        <br>
        <select id="projectFilter" v-model="filters.project">
          <option value="" disabled>Sélectionner un projet</option>
          <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
        </select>
        <br>
        <label for="activityFilter">Filtrer par activité :</label>
        <br>
        <select id="activityFilter" v-model="filters.activity">
          <option value="" disabled>Sélectionner un type d'activité</option>
          <option v-for="activity in activities" :key="activity.id" :value="activity.id">{{ activity.name }}</option>
        </select>
        <br>
        <label for="keywordsFilter">Filtrer par mots-clés :</label>
        <br>
        <input type="text" id="keywordsFilter" v-model="filters.keywords" />
      </form>
      </div>
    
    
    </div>

    
  </form>

  </div>
  
</div>
</div>
    <div class="fix">
      <ul>
        <li v-for="entry in filteredTimeEntries" :key="entry.id">
          {{ entry.projectName }} - {{ entry.activityName }} - {{ entry.start }} - {{ entry.end }}
          <button @click="editEntry(entry)" class="manual">Modifier</button>
          <button @click="deleteEntry(entry.id)" class="manual">Supprimer</button>
        </li>
      </ul>
    
    
      <form v-if="editingEntry" @submit.prevent="updateEntry" class="formulaire">
        <label for="editEntryProject">Projet :</label>
        <select id="editEntryProject" v-model="editingEntry.project_id">
          <option value="" disabled>Sélectionner un projet</option>
          <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
        </select>

        <label for="editEntryActivity">Type d'activité :</label>
        <select id="editEntryActivity" v-model="editingEntry.activity_id">
          <option value="" disabled>Sélectionner un type d'activité</option>
          <option v-for="activity in activities" :key="activity.id" :value="activity.id">{{ activity.name }}</option>
        </select>

        <label for="editEntryStart">Date et heure de début :</label>
        <input type="datetime" id="editEntryStart" v-model="editingEntry.start" required />

        <label for="editEntryEnd">Date et heure de fin :</label>
        <input type="datetime" id="editEntryEnd" v-model="editingEntry.end" required />

        <label for="editEntryComment">Commentaire :</label>
        <textarea id="editEntryComment" v-model="editingEntry.comment"></textarea>

        <button type="submit" class="manual">Enregistrer les modifications</button>
      </form>
    </div>

<button @click="showManualEntryForm" class="manual" id="centrer">Ajouter manuellement</button>
    <div class="manual-entry-form" v-if="showManualForm">

      <form v-if="showManualForm" @submit.prevent="createManualEntry" class="formulaire">
        <label for="manualProject">Projet :</label>
        <select id="manualProject" v-model="manualEntry.project_id">
          <option value="" disabled>Sélectionner un projet</option>
          <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
        </select>

        <label for="manualActivity">Activité :</label>
        <select id="manualActivity" v-model="manualEntry.activity_id">
          <option value="" disabled>Sélectionner un type d'activité</option>
          <option v-for="activity in activities" :key="activity.id" :value="activity.id">{{ activity.name }}</option>
        </select>

        <label for="manualStartTime">Date et heure de début :</label>
        <input type="datetime-local" id="manualStartTime" v-model="manualEntry.start" required>

        <label for="manualEndTime">Date et heure de fin :</label>
        <input type="datetime-local" id="manualEndTime" v-model="manualEntry.end" required>

        <label for="manualComment">Commentaire :</label>
        <textarea id="manualComment" v-model="manualEntry.comment" placeholder="Commentaire"></textarea>

        <button type="submit" class="manual">Ajouter</button>
      </form>
      </div>
</template>

<script>

import {useWorkTimeStore} from "@/stores/workTimeStore.js";
import { mapActions } from "pinia";

export default {
  data() {
    return {
      projects: [],
      activities: [],
      isActivityRunning: false,
      selectedProject: '',
      selectedActivity: '',
      runningActivity: {},
      entryNotes: '',
      timeEntries: [],
      elapsedTime: 0,
      elapsedTimeInterval: null,
      filters: {
        project: '',
        activity: '',
        keywords: '',
      },
      editingEntry: null,
      showManualForm: false,
      manualEntry: {
        project_id: '',
        activity_id: '',
        start: '',
        end: '',
        comment: '',
      },
    };
  },
  computed: {
    formatElapsedTime() {
      const hours = String(Math.floor(this.elapsedTime / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((this.elapsedTime % 3600) / 60)).padStart(2, '0');
      const seconds = String(this.elapsedTime % 60).padStart(2, '0');

      return `${hours}:${minutes}:${seconds}`;
    },
    filteredTimeEntries() {
      return this.timeEntries.filter((entry) => {
        const projectMatch = !this.filters.project || entry.project === this.filters.project;
        const activityMatch = !this.filters.activity || this.filters.activity.includes(entry.activity);
        const keywordsMatch = !this.filters.keywords || entry.comment.includes(this.filters.keywords);

        return projectMatch && activityMatch && keywordsMatch;
      });
    },
  },
  methods: {
    ...mapActions(useWorkTimeStore, ["addWorkTime"]),
    async startEntry() {
      try {
        const requestData = {
          project_id: this.selectedProject,
          activity_id: this.selectedActivity,
          comment: this.entryNotes,
        };

        const response = await this.$api.post('api/time-entries', requestData);

        this.isActivityRunning = true;
        this.runningActivity = response.data;
        this.elapsedTime = 0;

        this.elapsedTimeInterval = setInterval(() => {
          this.elapsedTime++;
        }, 1000); // Mettez à jour toutes les 1000 ms (1 seconde)

        this.$toast.success('Entrée créée avec succès');
      } catch (error) {
        this.$toast.error('Erreur lors de la création de l\'entrée');
        console.error('Erreur lors de la création de l\'entrée:', error);
      }
    },
    async stopEntry() {
      try {
        await this.$api.patch(`api/time-entries/${this.runningActivity.id}/stop`);

        const elapsedTimeInSeconds = this.elapsedTime;
        console.log(elapsedTimeInSeconds)
        const workTimeStore = useWorkTimeStore().workTime;
        this.addWorkTime(elapsedTimeInSeconds);
        console.log("test" + workTimeStore);

        this.isActivityRunning = false;
        this.runningActivity = null;
        clearInterval(this.elapsedTimeInterval);
        this.elapsedTimeInterval = null;

        // Mettez à jour la liste des activités réalisées ce jour
        await this.fetchTimeEntries();

        this.$toast.success('Entrée stoppée avec succès');
      } catch (error) {
        this.$toast.error('Erreur lors de l\'arrêt de l\'entrée');
        console.error('Erreur lors de l\'arrêt de l\'entrée:', error);
      }
    },
    async editEntry(entry) {
      this.editingEntry = { ...entry };
      await this.fetchTimeEntries();
    },
    async updateEntry() {
      try {
        const response = await this.$api.put(`api/time-entries/${this.editingEntry.id}`, {
          project_id: this.editingEntry.project_id,
          activity_id: this.editingEntry.activity_id,
          start: this.editingEntry.start,
          end: this.editingEntry.end,
          comment: this.editingEntry.comment,
        });

        const updatedEntryIndex = this.timeEntries.findIndex(e => e.id === this.editingEntry.id);
        if (updatedEntryIndex !== -1) {
          this.timeEntries[updatedEntryIndex] = response.data;
        }

        await this.fetchTimeEntries();

        this.$toast.success('Entrée modifiée avec succès');
        this.editingEntry = null;
      } catch (error) {
        this.$toast.error('Erreur lors de la modification de l\'entrée');
        console.error('Erreur lors de la modification de l\'entrée:', error);
      }
    },
    async deleteEntry(entryId) {
      try {
        await this.$api.delete(`api/time-entries/${entryId}`);
        this.$toast.success('Entrée supprimée avec succès');
        // Mettre à jour la liste des activités réalisées ce jour
        await this.fetchTimeEntries();
      } catch (error) {
        console.error('Erreur lors de la suppression de l`entrée', error);
      }
    },
    showManualEntryForm() {
      this.showManualForm = true;
    },

    async createManualEntry() {
      try {
        if (!this.manualEntry.project_id || !this.manualEntry.activity_id || !this.manualEntry.start || !this.manualEntry.end) {
          this.$toast.error('Veuillez remplir tous les champs obligatoires.');
          return;
        }

        await this.$api.post('api/time-entries', this.manualEntry);

        this.manualEntry = {
          project_id: '',
          activity_id: '',
          start: '',
          end: '',
          comment: '',
        };
        this.showManualForm = false;

        await this.fetchTimeEntries();

        this.$toast.success('Entrée manuelle créée avec succès');
      } catch (error) {
        this.$toast.error('Erreur lors de la création de l\'entrée manuelle');
        console.error('Erreur lors de la création de l\'entrée manuelle:', error);
      }
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

        // Effectuez une requête pour récupérer les détails des projets et activités
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

        // Ajoutez les noms des projets et des activités aux entrées
        this.timeEntries = entries.map(entry => ({
          ...entry,
          projectName: projectsMap[entry.project_id],
          activityName: activitiesMap[entry.activity_id],
        }));

        console.log(this.timeEntries);
      } catch (error) {
        console.error('Erreur lors de la récupération des entrées:', error);
      }
    },
  },

  async mounted() {
    await this.fetchProjectsAndActivities();
    await this.fetchTimeEntries();
  },
};
</script>

<style scoped>

h2{
  margin-left: 2em;
}

.forms-container {
  display: flex;
  margin-left:20%;
  margin-right: auto;


}
.form-container {
  flex: 1;
  margin: 0 10px 0 10px; /* Espacement entre les deux formulaires */
  
  align-items: center;
}
label,select{
    margin-bottom: 1em;
  }
  input,select,option,textarea{
    margin-bottom: 1em;
    background-color: rgb(76, 76, 76);
    color: white;
    border: none;
    border-radius: 0.5em;
    padding: 0.5em;
  }

  select{
    width: 200px;
  }

  #keywordsFilter{
    width: 200px;

  }
  form.formulaire {
    display: flex;
    flex-direction: column;
    padding: 2em;
    margin-left: auto;
    margin-right: auto;

  }

  .manual{
    padding:0.7em;
    background-color:#5216a8 ;
    color: white;
    border:none;
    border-radius: 5px;
    cursor: pointer;
  }

  #centrer{
    margin-left: 2.5em;
  }
</style>

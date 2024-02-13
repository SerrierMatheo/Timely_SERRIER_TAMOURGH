<template>
  <div class="activité">
    <h2>Gérer les activités</h2>

    <!-- Formulaire pour créer un activité -->
    <form @submit.prevent="createactivity">
      <label for="activityName">Nom de l'activité:</label>
      <input type="text" id="activityName" v-model="activityName" required />

      <label for="activitycolor">couleur:</label>
      <input type="color" id="activitycolor" v-model="activitycolor">

      <button type="submit">Créer l'activité</button>
    </form>

    <!-- Champ de recherche -->
    <input type="text" v-model="searchTerm" placeholder="Rechercher par nom" />

    <!-- Section des résultats de recherche -->
    <div v-if="searchTerm !== ''">
      <div v-if="filteredactivities.length > 0">
        <h3>Résultats de la recherche:</h3>
        <ul>
          <li v-for="activity in filteredactivities" :key="activity.id">
            {{ activity.name }} - {{ activity.color }}
            <button @click="editactivity(activity)">Modifier</button>
            <button @click="disableactivity(activity.id)" v-if="activity.is_enabled === 1">Désactiver</button>
            <button @click="enableactivity(activity.id)" v-else>Activer</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Aucun résultat trouvé.</p>
      </div>
    </div>
    <div v-else>
      <div v-if="activities.length > 0">
        <h3>Liste des activités:</h3>
        <ul>
          <li v-for="activity in activities" :key="activity.id">
            {{ activity.name }} - {{ activity.color }}
            <button @click="editactivity(activity)">Modifier</button>
            <button @click="disableactivity(activity.id)" v-if="activity.is_enabled === 1">Désactiver</button>
            <button @click="enableactivity(activity.id)" v-else>Activer</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Aucun activité trouvé.</p>
      </div>
    </div>


    <!-- Formulaire pour modifier un activité -->
    <form v-if="editingactivity" @submit.prevent="updateactivity">
      <label for="editactivityName">Nom du activité:</label>
      <input type="text" id="editactivityName" v-model="editingactivity.name" required />

      <label for="editactivitycolor">color du activité:</label>
      <input type="color" id="editactivitycolor" v-model="editingactivity.color">

      <button type="submit">Enregistrer les modifications</button>
    </form>

  </div>

</template>

<script>
export default {
  data() {
    return {
      activities: [],
      activityName: '',
      activitycolor: '',
      editingactivity: null,
      searchTerm: '',
    };
  },
  methods: {
    async fetchactivities() {
      try {
        const response = await this.$api.get('api/activities');
        this.activities = response.data;
      } catch (error) {
        this.$toast.error('Erreur lors de la récupération des activités');
        console.error('Erreur lors de la récupération des activités:', error);
      }
    },
    async createactivity() {
      try {
        const response = await this.$api.post('api/activities', {
          name: this.activityName,
          color: this.activitycolor,
        });
        this.activities.push(response.data);
        this.activityName = '';
        this.activitycolor = '';
        this.$toast.success('Activité créé avec succès');
      } catch (error) {
        this.$toast.error('Erreur lors de la création de l\'activité');
        console.error('Erreur lors de la création du activité:', error);
      }
    },
    editactivity(activity) {
      this.editingactivity = { ...activity };
    },
    async updateactivity() {
      try {
        const response = await this.$api.put(`/api/activities/${this.editingactivity.id}`, {
          name: this.editingactivity.name,
          color: this.editingactivity.color,
        });
        const updatedactivityIndex = this.activities.findIndex(p => p.id === this.editingactivity.id);
        if (updatedactivityIndex !== -1) {
          this.activities.splice(updatedactivityIndex, 1, response.data);
        }
        this.$toast.success('Activité modifier avec succès');
        this.editingactivity = null;
      } catch (error) {
        this.$toast.error('Erreur lors de la modification de l\'activité');
        console.error('Erreur lors de la modification du activité:', error);
      }
    },
    async disableactivity(activityId) {
      try {
        await this.$api.patch(`/api/activities/${activityId}/disable`);
        await this.fetchactivities();
        this.$toast.success('Activité désactiver avec succès');
      } catch (error) {
        this.$toast.error('Erreur lors de la désactivation du Activité');
        console.error('Erreur lors de la désactivation du activité:', error);
      }
    },
    async enableactivity(activityId) {
      try {
        await this.$api.patch(`/api/activities/${activityId}/enable`);
        await this.fetchactivities();
        this.$toast.success('Activité activer avec succès');
      } catch (error) {
        this.$toast.error('Erreur lors de l\'activation du Activité');
        console.error("Erreur lors de l'activation du activité:", error);
      }
    },
  },
  computed: {
    filteredactivities() {
      return this.activities.filter(activity =>
          activity.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  mounted() {
    this.fetchactivities();
  },
};
</script>

<style scoped>

</style>

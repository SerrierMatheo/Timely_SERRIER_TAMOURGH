<template>
  <div class="activité">
    <h2>Gérer les activités</h2>

    <!-- Formulaire pour créer un activité -->
    <form @submit.prevent="createactivity" class="formulaire">
      <label for="activityName">Nom de l'activité:</label>
      <input type="text" id="activityName" v-model="activityName" required />

      <label for="activitycolor">Attribuer une couleur:</label>
            <div id="swatch">
        <input type="color" id="activitycolor" name="color" value="#FF0000" v-model="activitycolor">
 
      </div>

      <button type="submit" class="btn">Créer l'activité</button>
    </form>

    <!-- Champ de recherche -->

    <div class="inputBox_container">
  <svg class="search_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" alt="search icon">
    <path d="M46.599 46.599a4.498 4.498 0 0 1-6.363 0l-7.941-7.941C29.028 40.749 25.167 42 21 42 9.402 42 0 32.598 0 21S9.402 0 21 0s21 9.402 21 21c0 4.167-1.251 8.028-3.342 11.295l7.941 7.941a4.498 4.498 0 0 1 0 6.363zM21 6C12.717 6 6 12.714 6 21s6.717 15 15 15c8.286 0 15-6.714 15-15S29.286 6 21 6z">
    </path>
  </svg>
  <input class="inputBox" id="inputBox" type="text" v-model="searchTerm" placeholder="Rechercher par nom">
</div>

    <!-- Section des résultats de recherche -->
    <div v-if="searchTerm !== ''" class="result">
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
      <div v-if="activities.length > 0" class="result">
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
    <form v-if="editingactivity" @submit.prevent="updateactivity" class="formulaire">
      <label for="editactivityName">Nom du activité:</label>
      <input type="text" id="editactivityName" v-model="editingactivity.name" required />

      <label for="editactivitycolor">color du activité:</label>
      <input type="color" id="editactivitycolor" v-model="editingactivity.color">

      <button type="submit" class="btn">Enregistrer les modifications</button>
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
  label{
    margin-bottom: 1em;
  }
  input{
    margin-bottom: 1em;
  }
  form.formulaire {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 2em;
    margin-left: auto;
    margin-right: auto;

  }
  h2,h3{
    text-align: center;
    margin-top: 2em;
  }

  #swatch{
  display: flex;
  flex-direction: column;
  color: black;
}

.result{

text-align: center;
}

.inputBox_container {
  display: flex;
  align-items: center;
  flex-direction: row;
  max-width: 14em;
  
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  height: fit-content;
  background-color: #5c6370;
  border-radius: 0.8em;
  overflow: hidden;
}

.search_icon {
  height: 1em;
  padding: 0 0.5em 0 0.5em;
  fill: #abb2bf;
}

.inputBox {
  background-color: transparent;
  color: #ffffff;
  outline: none;
  margin-top: 0.8em;
  width: 100%;
  border: 0;
  padding:0;
}


input[type="color"] {
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0;
  width: 100%;
}
</style>

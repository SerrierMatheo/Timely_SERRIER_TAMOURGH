<!-- ObjectivesView.vue -->
<template>
  <div>
    <h2>Gérer les Objectifs</h2>

    <button @click="showCreateObjectiveForm" class="manual2">Ajouter un objectif</button>

    <!-- Formulaire d'ajout d'un objectif -->
    <div v-if="createObjectiveFormVisible">
      <h3>Créer un nouvel objectif</h3>
      <form @submit.prevent="createObjective" class="formulaire">
        <label for="objectiveName">Nom de l'objectif:</label>
        <input type="text" id="objectiveName" v-model="newObjective.name" required />

        <label for="objectiveContent">Contenu de l'objectif:</label>
        <textarea id="objectiveContent" v-model="newObjective.content"></textarea>

        <button type="submit" class="manual">Créer l'objectif</button>
      </form>
    </div>

    <!-- Liste des objectifs à atteindre -->
    <h3>Objectifs à atteindre</h3>
    <div v-if="filteredObjectives && filteredObjectives.length > 0">
      <ul>
        <li v-for="objective in filteredObjectives" :key="objective.id">
          {{ objective.name }} - {{ objective.content }}
          <button @click="markObjectiveAsDone(objective.id)" class="manual">Marquer comme atteint</button>
          <button @click="editObjective(objective)" class="manual">Modifier</button>
          <button @click="deleteObjective(objective.id)" class="manual">Supprimer</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Aucun objectif à atteindre.</p>
    </div>

    <!-- Formulaire pour filtrer les objectifs -->
    <form class="formulaire">
    <div class="filters">
      <label for="dateFilter">Filtrer par date :</label>
      <br><br>
      <input type="date" id="dateFilter" v-model="filters.date" />
      <br>
      <label for="doneFilter">Filtrer par accomplissement :</label>
      <br><br>
      <select id="doneFilter" v-model="filters.done">
        <option value="">Tous</option>
        <option value="0">Non accomplis</option>
        <option value="1">Accomplis</option>
      </select>
      <br>
      <label for="keywordsFilter">Rechercher par mots-clés :</label>
      <br><br>
      <input type="text" id="keywordsFilter" v-model="filters.keywords" />
    </div>
  </form>

    <!-- Liste des objectifs passés réalisés -->
    <h3>Objectifs passés</h3>
    <div v-if="pastObjectives && pastObjectives.length > 0">
      <ul>
        <li v-for="objective in pastObjectives" :key="objective.id">
          {{ objective.name }} - {{ objective.content }}
          <!-- Boutons pour gérer les objectifs passés -->
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Aucun objectif passé trouvé.</p>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      objectives: [],
      objectiveName: '',
      objectiveContent: '',
      newObjective: {
        name: '',
        content: '',
      },
      filters: {
        date: '',
        done: '',
        keywords: '',
      },
      createObjectiveFormVisible: false, // Nouvelle donnée pour gérer la visibilité du formulaire
    };
  },
  computed: {
    filteredObjectives() {
      return this.objectives;
    },
    pastObjectives() {
      return this.objectives.filter((objective) => {
      });
    },
  },
  methods: {
    showCreateObjectiveForm() {
      this.createObjectiveFormVisible = true;
    },
    async createObjective()
    {
      try {
        await this.$api.post('/api/daily-objectives', {
          name: this.newObjective.name,
          content: this.newObjective.content,
        });

        this.$toast.success('Objectif créé avec succès:');

        // Réinitialiser le formulaire et masquer le formulaire de création
        this.newObjective.name = '';
        this.newObjective.content = '';
        this.createObjectiveFormVisible = false;

        // Mettez à jour la liste des objectifs (à implémenter)
        await this.fetchObjectives();
      } catch (error) {
        // Gérer les erreurs de l'API
        this.$toast.error('Erreur lors de la création de l\'objectif:');
      }
    }
,

    // Exemple de méthode pour marquer un objectif comme atteint
    async markObjectiveAsDone(objectiveId) {
      // Logique pour marquer un objectif comme atteint
    },

    // Exemple de méthode pour modifier un objectif
    async editObjective(objective) {
      // Logique pour modifier un objectif
    },

    // Exemple de méthode pour supprimer un objectif
    async deleteObjective(objectiveId) {
      // Logique pour supprimer un objectif
    },

    async fetchObjectives() {
      try {
        const response = await this.$api.get('api/daily-objectives');
        this.objectives = response.data;
        console.log(this.objectives)
      }catch (error){
        this.$toast.error('erreur récupération objectifs');
        console.error('erreur récupération objectifs', error);
      }
    },
  },
  mounted() {
    this.fetchObjectives();
  }
};
</script>

<style scoped>
h2,h3,p{
  margin-left: 2em;
}

.forms-container {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 2em;
  margin-left: auto;
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
  .manual2{
    padding:0.7em;
    background-color:#5216a8 ;
    color: white;
    border:none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 3em;
  }

  #centrer{
    margin-left: 2.5em;
  }
</style>

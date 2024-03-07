<template>
  <div class="projet">
    <h2>Gérer les projets</h2>

    <!-- Formulaire pour créer un projet -->
    <form @submit.prevent="createProject" class="formulaire">
      <label for="projectName">Nom du projet:</label>
      <input type="text" id="projectName" v-model="projectName" required />

      <label for="projectDescription">Description du projet:</label>
      <textarea id="projectDescription" v-model="projectDescription"></textarea>

      <button type="submit" class="btn">Créer le projet</button>
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
    <div v-if="searchTerm !== ''">
      <div v-if="filteredProjects.length > 0">
        <h3>Résultats de la recherche:</h3>
        <ul>
          <li v-for="project in filteredProjects" :key="project.id" class="result">
            {{ project.name }} - {{ project.description }}
            <div class="sml">
            <button @click="editProject(project)" class="smallBtn">Modifier</button>
            <button @click="disableProject(project.id)" v-if="project.is_enabled === 1" class="smallBtn">Désactiver</button>
            <button @click="enableProject(project.id)" v-else class="smallBtn">Activer</button>
          </div>
          </li>
        </ul>
      </div>
      <div v-else class="result">
        <p>Aucun résultat trouvé.</p>
      </div>
    </div>
    <div v-else class="result">
      <div v-if="projects.length > 0">
        <h3>Liste des projets:</h3>
        <ul>
          <li v-for="project in projects" :key="project.id">
            {{ project.name }} - {{ project.description }}
            <button @click="editProject(project)"  class="smallBtn">Modifier</button>
            <button @click="disableProject(project.id)" v-if="project.is_enabled === 1" class="smallBtn">Désactiver</button>
            <button @click="enableProject(project.id)" v-else class="smallBtn">Activer</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Aucun projet trouvé.</p>
      </div>
    </div>


    <!-- Formulaire pour modifier un projet -->
    <form v-if="editingProject" @submit.prevent="updateProject" class="formulaire">
      <label for="editProjectName">Nom du projet:</label>
      <input type="text" id="editProjectName" v-model="editingProject.name" required />

      <label for="editProjectDescription">Description du projet:</label>
      <textarea id="editProjectDescription" v-model="editingProject.description"></textarea>

      <button type="submit" class="btn">Enregistrer les modifications</button>
    </form>

  </div>

</template>

<script>
export default {
  data() {
    return {
      projects: [],
      projectName: '',
      projectDescription: '',
      editingProject: null,
      searchTerm: '',
    };
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await this.$api.get('api/projects');
        this.projects = response.data;
      } catch (error) {
        this.$toast.error('Erreur lors de la récupération des projets');
        console.error('Erreur lors de la récupération des projets:', error);
      }
    },
    async createProject() {
      try {
        const response = await this.$api.post('api/projects', {
          name: this.projectName,
          description: this.projectDescription,
        });
        this.projects.push(response.data);
        this.projectName = '';
        this.projectDescription = '';
        this.$toast.success('Projet créé avec succès');
      } catch (error) {
        this.$toast.error('Erreur lors de la création du projet');
        console.error('Erreur lors de la création du projet:', error);
      }
    },
    editProject(project) {
      this.editingProject = { ...project };
    },
    async updateProject() {
      try {
        const response = await this.$api.put(`/api/projects/${this.editingProject.id}`, {
          name: this.editingProject.name,
          description: this.editingProject.description,
        });
        const updatedProjectIndex = this.projects.findIndex(p => p.id === this.editingProject.id);
        if (updatedProjectIndex !== -1) {
          this.projects.splice(updatedProjectIndex, 1, response.data);
        }
        this.$toast.success('Projet modifier avec succès');
        this.editingProject = null;
      } catch (error) {
        this.$toast.error('Erreur lors de la modification du projet');
        console.error('Erreur lors de la modification du projet:', error);
      }
    },
    async disableProject(projectId) {
      try {
        await this.$api.patch(`/api/projects/${projectId}/disable`);
        await this.fetchProjects();
        this.$toast.success('Projet désactiver avec succès');
      } catch (error) {
        this.$toast.error('Erreur lors de la désactivation du projet');
        console.error('Erreur lors de la désactivation du projet:', error);
      }
    },
    async enableProject(projectId) {
      try {
        await this.$api.patch(`/api/projects/${projectId}/enable`);
        await this.fetchProjects();
        this.$toast.success('Projet activer avec succès');
      } catch (error) {
        this.$toast.error('Erreur lors de l\'activation du projet');
        console.error("Erreur lors de l'activation du projet:", error);
      }
    },
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(project =>
          project.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  mounted() {
    this.fetchProjects();
  },
};
</script>

<style scoped>
label{
  margin-bottom: 1em;
}
input,select,textarea{
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
.result{

  text-align: center;
}

h2,h3{
  text-align: center;
  margin-left: auto;
  margin-top: 2em;
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

::placeholder {
  color: #abb2bf;
}

.btn{
  margin-top: 1em;
  background-color: #5216a8;
  color: white;
}

.smallBtn{
  color: white;
  background-color: #5216a8;
  margin-top: 1em;
}


</style>

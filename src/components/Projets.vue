<template>
  <div class="projet">
    <h2>Gérer les projets</h2>

    <!-- Formulaire pour créer un projet -->
    <form @submit.prevent="createProject">
      <label for="projectName">Nom du projet:</label>
      <input type="text" id="projectName" v-model="projectName" required />

      <label for="projectDescription">Description du projet:</label>
      <textarea id="projectDescription" v-model="projectDescription"></textarea>

      <button type="submit">Créer le projet</button>
    </form>

    <!-- Champ de recherche -->
    <input type="text" v-model="searchTerm" placeholder="Rechercher par nom" />

    <!-- Section des résultats de recherche -->
    <div v-if="searchTerm !== ''">
      <div v-if="filteredProjects.length > 0">
        <h3>Résultats de la recherche:</h3>
        <ul>
          <li v-for="project in filteredProjects" :key="project.id">
            {{ project.name }} - {{ project.description }}
            <button @click="editProject(project)">Modifier</button>
            <button @click="disableProject(project.id)" v-if="project.is_enabled === 1">Désactiver</button>
            <button @click="enableProject(project.id)" v-else>Activer</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Aucun résultat trouvé.</p>
      </div>
    </div>
    <div v-else>
      <div v-if="projects.length > 0">
        <h3>Liste des projets:</h3>
        <ul>
          <li v-for="project in projects" :key="project.id">
            {{ project.name }} - {{ project.description }}
            <button @click="editProject(project)">Modifier</button>
            <button @click="disableProject(project.id)" v-if="project.is_enabled === 1">Désactiver</button>
            <button @click="enableProject(project.id)" v-else>Activer</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Aucun projet trouvé.</p>
      </div>
    </div>


    <!-- Formulaire pour modifier un projet -->
    <form v-if="editingProject" @submit.prevent="updateProject">
      <label for="editProjectName">Nom du projet:</label>
      <input type="text" id="editProjectName" v-model="editingProject.name" required />

      <label for="editProjectDescription">Description du projet:</label>
      <textarea id="editProjectDescription" v-model="editingProject.description"></textarea>

      <button type="submit">Enregistrer les modifications</button>
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

</style>

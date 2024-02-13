<template>
  <div class="profile-view">
    <!-- Menu vertical à gauche -->
    <div class="profile-menu">
      <ul>
        <li @click="changeOption('viewProfile')">Mes informations</li>
        <li @click="changeOption('editProfile')">Modifier le profil</li>
        <!-- Ajoutez d'autres options si nécessaire -->
      </ul>
    </div>

    <!-- Contenu principal -->
    <div class="profile-content">
      <!-- Affichage du profil ou formulaire de modification en fonction de l'option sélectionnée -->
      <h2 class="day-text">Profil</h2>
      <div v-if="selectedOption === 'viewProfile'">
        <h3 class="day-text">Mon token : {{ key }}</h3>
        <p>Nom complet : {{ profileInfo.name }}</p>
        <p>Adresse email : {{ profileInfo.email }}</p>
      </div>
      <div v-else-if="selectedOption === 'editProfile'">
        <!-- Formulaire de modification du profil -->
        <form @submit.prevent="submitForm">
          <label for="name">Nom complet:</label>
          <input type="text" id="name" v-model="name" required />

          <label for="email">Adresse email:</label>
          <input type="email" id="email" v-model="email" required />

          <button type="submit">Enregistrer</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/authStore.js";
import axios from "axios";
import {mapState} from "pinia";

export default {
  data() {
    return {
      key: useAuthStore().apikey,
      selectedOption: 'viewProfile',
      name: "",
      email: "",
      profileInfo: {} // Ajout de l'objet pour stocker les informations du profil
    };
  },
  methods: {
    async fetchProfileInfo() {
      try {
        const response = await this.$api.get("api/profile");
        this.profileInfo = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des informations du profil:", error);
        // Gérer les erreurs ici
      }
    },
    changeOption(option) {
      this.selectedOption = option;

      // Si l'option est "Mes informations" et les infos du profil ne sont pas encore récupérées, effectuer la requête API
      if (option === 'viewProfile' && Object.keys(this.profileInfo).length === 0) {
        this.fetchProfileInfo();
      }
    },
    async submitForm() {
      try {
        const response = await this.$api.put("api/profile", {
          name: this.name,
          email: this.email
        });

        console.log("Profil mis à jour avec succès:", response.data);

        this.selectedOption = 'viewProfile';
        this.fetchProfileInfo(); // Actualiser les informations du profil après la modification
      } catch (error) {
        console.error("Erreur lors de la mise à jour du profil:", error);
        // Gérer les erreurs ici
      }
    },
  },
  mounted() {
    // Au chargement du composant, récupérer les informations du profil par défaut
    this.fetchProfileInfo();
  }
};
</script>

<style scoped>
.profile-view {
  display: flex;
}

.profile-menu {
  width: 150px;
  background-color: #f1f1f1;
  padding: 20px;
}

.profile-menu ul {
  list-style-type: none;
  padding: 0;
}

.profile-menu li {
  padding: 8px;
  cursor: pointer;
}

.profile-content {
  padding: 16px;
}
</style>

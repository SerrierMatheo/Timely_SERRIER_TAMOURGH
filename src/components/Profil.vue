<script>
import { useAuthStore } from "@/stores/authStore.js";

export default {
  data() {
    return {
      key: useAuthStore().apikey,
      selectedOption: 'viewProfile',
      name: "",
      email: "",
      profileInfo: {}
    };
  },
  methods: {
    async fetchProfileInfo() {
      try {
        const response = await this.$api.get("api/profile");
        this.profileInfo = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des informations du profil:", error);
      }
    },
    changeOption(option) {
      this.selectedOption = option;

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
        await this.fetchProfileInfo();
        this.$toast.success('Profile modifié avec succès');
      } catch (error) {
        this.$toast.error('Identifiant invalide');
        console.error("Erreur lors de la mise à jour du profil:", error);
      }
    },
  },
  mounted() {
    this.fetchProfileInfo();
  }
};
</script>

<template>
  <div class="profile-view">
    <div class="profile-menu">
      <ul>
        <li @click="changeOption('viewProfile')">Mes informations</li>
        <li @click="changeOption('editProfile')">Modifier le profil</li>
      </ul>
    </div>

    <div class="profile-content">
      <h2 class="day-text">Profil</h2>
      <div v-if="selectedOption === 'viewProfile'">
        <h3 class="day-text">Mon token : {{ key }}</h3>
        <p>Nom complet : {{ profileInfo.name }}</p>
        <p>Adresse email : {{ profileInfo.email }}</p>
      </div>
      <div v-else-if="selectedOption === 'editProfile'">
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

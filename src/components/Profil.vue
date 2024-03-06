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
        this.name = "";
        this.email = "";
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


    <div class="profile-content">
      <div v-if="selectedOption === 'viewProfile'" class="infos">
        <h3 class="day-text">Mon token : {{ key }}</h3>
        <p class="day-text">Nom complet : {{ profileInfo.name }}</p>
        <p class="day-text">Adresse email : {{ profileInfo.email }}</p>
      </div>
      <div v-else-if="selectedOption === 'editProfile'" class="idk">
        <form @submit.prevent="submitForm" class="formulaire">
          <label for="name">Nom complet:</label>
          <input type="text" id="name" v-model="name" required />

          <label for="email">Adresse email:</label>
          <input type="email" id="email" v-model="email" required />

          <button type="submit"class="btn" name="radio">Enregistrer</button>
        </form>
      </div>
    </div>
  </div>
  <div class="profile-menu">
        <button @click="changeOption('viewProfile')" class="radio" name="radio">Mes informations</button>
        <button @click="changeOption('editProfile')" class="radio" name="radio">Modifier le profil</button>
      </div>

      

</template>



<style scoped>
.profile-view {
  margin-bottom: 2em;
}

.profile-menu {
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  color: white;
  width: 300px;
  font-size: 5px;
  margin-bottom: 5em;

}

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

.profile-content {
  padding: 16px;
}

.infos{
  margin-top: 2.5em;
  margin-bottom: 2.5em;
}




.profile-menu {

  border-radius: 0.5rem;
  background-color: #5216a8;
  box-sizing: border-box;
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  margin-top: 0.5em;
  color: white;
  width: 300px;
  font-size: 5px;
}

.profile-menu .radio {
  flex: 1 1 auto;
  text-align: center;
}

.profile-menu .radio button {
  display: none;
}

.profile-menu .radio{
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: none;
  padding: .5rem 0;
  transition: all .15s ease-in-out;
}
button{
  color: white;
  background-color: #5216a8;
}
button:active  {
  background-color:#a57ef3;
  font-weight: 200;
}
.profile-menu .radio.active {
  background-color: #a57ef3;
  font-weight: 600;
}

.profile-menu button:focus,
    .profile-menu button:focus-within {
      background-color: #a57ef3;
      color: #fff;
    }
</style>

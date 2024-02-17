<template>
    <form @submit.prevent="submitForm" class="form">
      <div class="h1" id="heading">Connectez-vous</div>
      <div class="field">
        <input placeholder="Key" class="input-field" v-model="key" id="key" name="key" type="text" required >
      </div>
      <input value="Connexion" class="btn" type="submit">
    </form>
  </template>

<script>
import { useAuthStore } from "@/stores/authStore.js";
import { mapActions } from "pinia";
import router from "@/router/index.js";

export default {
  data() {
    return {
      key: ""
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["setApikey"]),
    async submitForm() {
      //permet de vérifier si le token est bon
      try {
        const config = {
          headers: {
            Authorization: `key=${this.key}`
          }
        };

        const response = await this.$api.get("api/profile", config);

        if (response.status === 200) {
          this.setApikey(this.key);
          await router.push("/");
          this.$toast.success('Connexion réussie');
        } else {
          this.$toast.error('Identifiant invalide');
        }
      } catch (error) {
        this.$toast.error('Identifiant invalide');
      }
    }
  }
}
</script>

  
 
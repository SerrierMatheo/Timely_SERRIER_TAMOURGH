<template>
  <div>
    <form @submit.prevent="submitForm" class="form">
      <div class="h1" id="heading">Inscrivez-vous</div>
      <div class="field">
      <input placeholder="Name" class="input-field" v-model="name" id="name" name="name" type="text" required>
    </div>
    <div class="field">
      <input placeholder="Email" class="input-field" v-model="email" id="email" name="email" type="email" required>
    </div>
      <input value="Register" class="btn" type="submit">
    </form>

    <!-- Afficher this.apikey si non vide -->
    <div v-if="this.apikey !== ''">
      <p>API Key: {{ this.apikey }}</p>
    </div>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores/authStore.js";
import {mapState, mapActions} from "pinia";

export default {
  data() {
    return {
      name: '',
      email: '',
    }
  },
  computed: {
    ...mapState(useAuthStore, ["apikey"])
  },
  methods: {
    ...mapActions(useAuthStore, ["setApikey"]),
    submitForm() {
      console.log(this.name)
      this.$api.post('api/apikeys', {
        name: this.name,
        email: this.email
      }).then((response) => {
        console.log(response.data.key);
        this.setApikey(response.data.key);
      }).catch((error) => {
        window.alert("Veuillez remplir tous les champs correctement");
      });
    }
  }
}
</script>
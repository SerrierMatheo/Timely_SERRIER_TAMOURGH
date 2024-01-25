<template>
    <form @submit.prevent="submitForm" class="register wrap">
      <div class="h1">Connexion</div>
      <input placeholder="Key" v-model="key" id="key" name="key" type="text" required>
      <input value="Connexion" class="btn" type="submit">
    </form>
  </template>

<script>
import {useAuthStore} from "@/stores/authStore.js";
import {mapState, mapActions} from "pinia";

export default {
  data() {
    return {
      key: ''
    }
  },
  computed: {
    ...mapState(useAuthStore, ["apikey"])
  },
  methods: {
    ...mapActions(useAuthStore, ["setApikey"]),
    submitForm() {
      this.$api.get('api/profile').then((response) => {
        if(response.status === 200) {
          this.setApikey(this.key)
        }
      }).catch((error) => {
        window.alert("apikey invalide : ")
      })
    }
  }
}
</script>
  
  
 
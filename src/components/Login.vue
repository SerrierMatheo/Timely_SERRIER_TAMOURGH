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
import {useAuthStore} from "@/stores/authStore.js";
import {mapState, mapActions} from "pinia";
import router from "@/router/index.js";

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
      console.log(this.apikey);

      const config = {
        headers: {
          Authorization: `key=${this.key}`
        }
      };

      this.$api.get('api/profile', config).then((response) => {
        if(response.status === 200) {
          this.setApikey(this.key)

          router.push('/')
        }
      }).catch((error) => {
        window.alert("apikey invalide : " + this.key)
      })
    }
  }
}
</script>
  
  
 
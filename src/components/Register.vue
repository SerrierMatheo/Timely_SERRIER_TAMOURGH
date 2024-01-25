<template>
  <div>
    <form @submit.prevent="submitForm" class="register wrap">
      <div class="h1">Register</div>
      <input placeholder="Name" v-model="name" id="name" name="name" type="text" required>
      <input placeholder="Email" v-model="email" id="email" name="email" type="email" required>
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

<style scoped>
.register {
  width: 340px;
  height: 400px;
  background: #2c2c2c;
  padding: 47px;
  padding-bottom: 57px;
  color: #fff;
  border-radius: 17px;
  padding-bottom: 50px;
  font-size: 1.3em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.register input[type="text"],
.register input[type="email"] {
  opacity: 1;
  display: block;
  border: none;
  outline: none;
  width: 100%;
  padding: 13px 18px;
  margin: 20px 0 0 0;
  font-size: 0.8em;
  border-radius: 100px;
  background: #3c3c3c;
  color: #fff;
}

.register input:focus {
  animation: bounce 1s;
  -webkit-appearance: none;
}

.register input[type=submit],
.register input[type=button],
.h1 {
  border: 0;
  outline: 0;
  width: 100%;
  padding: 13px;
  margin: 40px 0 0 0;
  border-radius: 500px;
  font-weight: 600;
  animation: bounce2 1.6s;
}

.h1 {
  padding: 0;
  position: relative;
  top: -35px;
  display: block;
  margin-bottom: -0px;
  font-size: 1.3em;
}

.btn {
  background: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
  color: #fff;
  padding: 16px !important;
}

.btn:hover {
  background: linear-gradient(144deg, #1e1e1e , 20%,#1e1e1e 50%,#1e1e1e );
  color: rgb(255, 255, 255);
  padding: 16px !important;
  cursor: pointer;
  transition: all 0.4s ease;
}

.register input[type=text] {
  animation: bounce 1s;
  -webkit-appearance: none;
}

.register input[type=password] {
  animation: bounce1 1.3s;
}

.ui {
  font-weight: bolder;
  background: -webkit-linear-gradient(#B563FF, #535EFC, #0EC8EE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-bottom: 4px solid transparent;
  border-image: linear-gradient(0.25turn, #535EFC, #0EC8EE, #0EC8EE);
  border-image-slice: 1;
  display: inline;
}

@media only screen and (max-width: 600px) {
  .register {
    width: 70%;
    padding: 3em;
  }
}

@keyframes bounce {
  0% {
    transform: translateY(-250px);
    opacity: 0;
  }
}

@keyframes bounce1 {
  0% {
    opacity: 0;
  }

  40% {
    transform: translateY(-100px);
    opacity: 0;
  }
}

@keyframes bounce2 {
  0% {
    opacity: 0;
  }

  70% {
    transform: translateY(-20px);
    opacity: 0;
  }
}
</style>
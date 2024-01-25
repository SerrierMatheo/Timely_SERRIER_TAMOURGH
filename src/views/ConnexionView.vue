<script>
import Login from "../components/Login.vue";

export default {
  components: {
    Login
  }
}
</script>

<template>
  <main>
    <h2>Connexion</h2>
    <Login/>
    <RouterLink to="/inscription">Pas de compte? S'inscrire.</RouterLink>
  </main>
</template>
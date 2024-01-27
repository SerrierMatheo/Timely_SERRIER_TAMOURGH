<script>
import Login from "../components/Login.vue";

export default {
  components: {
    Login
  }
}
</script>

<template>
  <main class="day-text">
    <h2>Connexion</h2>
    <Login/>
    <RouterLink to="/auth/register">Pas de compte? S'inscrire.</RouterLink>
  </main>
</template>
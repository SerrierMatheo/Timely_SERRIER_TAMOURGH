<script>
import Register from "../components/Register.vue";

export default {
  components: {
    Register
  }
}
</script>

<template>
  <main>
    <h2>S'inscrire</h2>
    <Register/>
    <RouterLink to="/auth/login">Déja un compte? Se connecter.</RouterLink>
  </main>
</template>
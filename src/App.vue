<script setup>
import { RouterView } from 'vue-router';
import Header from "@/components/Header.vue";

</script>

<template>
  <div class="wrapper">
    <Header />
<br>
  <main class="content">
    <RouterView />
  </main>
</div>

</template>

<style scoped>
.content{
  padding-bottom: 5em;
  padding-top: 5em;
  margin-top: 3em;
}

.wrapper{
  margin-top: 2em;
}


</style>

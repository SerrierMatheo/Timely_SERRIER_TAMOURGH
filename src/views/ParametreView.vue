<template>
  <div>
    <!-- Menu de sélection des sous-menus -->
    <div class="parametre-menu">
      <button @click="selectSubMenu('profil')">Mon profil</button>
      <button @click="selectSubMenu('projets')">Mes projets</button>
      <button @click="selectSubMenu('activites')">Mes activités</button>
    </div>

    <!-- Contenu du sous-menu sélectionné -->
    <div class="parametre-content">
      <component :is="selectedSubMenuComponent" />
    </div>
  </div>
</template>

<script>
import Profil from "@/components/Profil.vue";
import Projets from "@/components/Projets.vue";
import Activites from "@/components/Activites.vue";

export default {
  data() {
    return {
      selectedSubMenu: "profil"
    };
  },
  computed: {
    selectedSubMenuComponent() {
      // Retourne le composant correspondant à la sélection
      switch (this.selectedSubMenu) {
        case "profil":
          return Profil;
        case "projets":
          return Projets;
        case "activites":
          return Activites;
        default:
          return Profil; // Composant par défaut
      }
    }
  },
  methods: {
    selectSubMenu(subMenu) {
      // Méthode pour changer le sous-menu sélectionné
      this.selectedSubMenu = subMenu;
    }
  }
};
</script>

<style scoped>
.parametre-menu {
  display: flex;
  justify-content: space-around;
  padding: 10px;
}

.parametre-content {
  margin-top: 20px;
}
</style>
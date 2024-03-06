<template>
  <div>
    <!-- Menu de sélection des sous-menus -->
    <div class="parametre-menu">
      <button @click="selectSubMenu('profil')" class="radio" name="radio" :class="{ active: isSelectedSubMenu('profil') }">Mon profil</button>
      <button @click="selectSubMenu('projets')" class="radio" name="radio" :class="{ active: isSelectedSubMenu('projets') }">Mes projets</button>
      <button @click="selectSubMenu('activites')" class="radio" name="radio" :class="{ active: isSelectedSubMenu('activites') }">Mes activités</button>
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
    },
    isSelectedSubMenu(subMenu) {
    return this.selectedSubMenu === subMenu;
  }
  }
};
</script>

<style scoped>
.parametre-menu {
  display: flex;
  justify-content: space-around;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
}

.parametre-content {
  margin-top: 20px;
}


.parametre-menu {

  border-radius: 0.5rem;
  background-color: #EEE;
  box-sizing: border-box;
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  margin-top: 0.5em;
  width: 500px;
  font-size: 14px;
}

.parametre-menu .radio {
  flex: 1 1 auto;
  text-align: center;
}

.parametre-menu .radio button {
  display: none;
}

.parametre-menu .radio{
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: none;
  padding: .5rem 0;
  color: rgba(51, 65, 85, 1);
  transition: all .15s ease-in-out;
}

button:active  {
  background-color: #fff;
  font-weight: 600;
}
.parametre-menu .radio.active {
  background-color: #fff;
  font-weight: 600;
}
</style>
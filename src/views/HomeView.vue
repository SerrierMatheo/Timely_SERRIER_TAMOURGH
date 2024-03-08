<template>
  <main class="day-text">
    <div class="parametre-menu">
      <button @click="showTimetracker" class="radio" name="radio" autofocus>Timetracker</button>
      <button @click="showDailyObjectives"class="radio" name="radio">Daily Objectives</button>
    </div>
    <!--<Timetracker v-if="showingTimetracker" />-->
    <Timetracker v-if="showingTimetracker" />
    <DailyObjectives v-if="showingDailyObjectives" />
  </main>
</template>

<script>
import Timetracker from "@/components/timetracker.vue";
//import test from "@/components/test.vue";
import DailyObjectives from "@/components/daily-objectives.vue";

export default {
  components: {
    Timetracker,
    //test,
    DailyObjectives
  },
  data() {
    return {
      showingTimetracker: true,
      showingDailyObjectives: false
    };
  },
  methods: {
    showTimetracker() {
      this.showingTimetracker = true;
      this.showingDailyObjectives = false;
    },
    showDailyObjectives() {
      this.showingTimetracker = false;
      this.showingDailyObjectives = true;
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
.parametre-menu {

border-radius: 0.5rem;
background-color: #EEE;
box-sizing: border-box;
box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
padding: 0.25rem;
margin-top: 0.5em;
width: 300px;
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
.parametre-menu .radio.active {
  background-color: #fff;
  font-weight: 600;
}

.parametre-menu button:focus,
    .profile-menu button:focus-within {
      background-color: #a57ef3;
      color: #fff;
    }
</style>

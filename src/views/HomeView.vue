<script>
import Timetracker from "@/components/timetracker.vue";
import DailyObjectives from "@/components/daily-objectives.vue";

export default {
  components: {
    Timetracker,
    DailyObjectives
  },
}
</script>

<template>
  <main class="day-text">
    <Timetracker/>
    <DailyObjectives/>
  </main>
</template>


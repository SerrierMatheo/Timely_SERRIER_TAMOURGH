<script>
import { useWorkTimeStore} from "@/stores/workTimeStore.js";

export default {
  data() {
    return {
      timer: null,
    };
  },

  methods: {
    checkAndResetWorkTime() {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
        const workTimeStore = useWorkTimeStore();
        workTimeStore.resetWorkTime();
      }
    },
  },

  mounted() {
    this.checkAndResetWorkTime();

    this.timer = setInterval(() => {
      this.checkAndResetWorkTime();
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

};

</script>


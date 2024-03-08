<script >
export const timeFormatMixin = {
  methods: {
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
    },
    pad(value) {
      return value.toString().padStart(2, '0');
    },
  },
};

</script>


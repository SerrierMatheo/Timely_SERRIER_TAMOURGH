import { defineStore } from 'pinia';

export const useWorkTimeStore = defineStore('workTime', {
    state: () => ({
        workTime: null,
    }),
    actions: {
        addWorkTime(WorkTime) {
            this.workTime += WorkTime;
        },
        resetWorkTime() {
            this.workTime = null;
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {storage: localStorage, paths:['workTime']}
        ]
    }
});
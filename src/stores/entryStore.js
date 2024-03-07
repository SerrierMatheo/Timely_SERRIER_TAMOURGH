// entryStore.js
import { defineStore } from 'pinia';

export const useEntryStore = defineStore('entry', {
    state: () => ({
        lastEntry: null,
    }),
    actions: {
        setLastEntry(entry) {
            this.lastEntry = entry;
        },
        clearLastEntry() {
            this.lastEntry = null;
        },
    },
    persist: {
    enabled: true,
        strategies: [
        {storage: localStorage, paths:['lastEntry']}
    ]
}
});

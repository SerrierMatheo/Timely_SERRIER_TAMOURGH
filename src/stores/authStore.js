import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state() {
        return {
            apikey: '',
        }
    },
    actions: {
        setApikey(apikey) {
            this.apikey = apikey;
        },
        removeApikey() {
            this.apikey = null;
          },
    },
    persist: {
        enabled: true,
        strategies: [
            {storage: localStorage, paths:['apikey']}
        ]
    }
})
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({ 
        username: null,
        uuid: null,
        token: null,
        email: null,
    }),
    getters: {
      isAuthenticated: (store) => {
        if (store.token) return true
        return false
      }, 
      getToken: (store) => {
        return store.token
      }
    },
    actions: {
      setUserInfo(user) {
        this.username = user.username,
        this.uuid = user.uuid,
        this.email = user.email
        this.token = user.token
      },
      logoutUser() {
        this.username = null,
        this.uuid = null,
        this.email = null,
        this.token = null
      }
    },
    persist: true
  })

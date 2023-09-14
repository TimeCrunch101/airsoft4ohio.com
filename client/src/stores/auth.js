import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    fullName: null,
    token: null,
    sasToken: null,
    secondFactor: false
  }),
  getters: {
    isAuthenticated: (store) => {
      if (store.token === null) return false
      else return true
    },
    getToken: (store) => {
      return store.token;
    },
    getUser: (store) => {
      return store.fullName
    },
    getSasToken: (store) => {
      return store.sasToken
    },
    getSecondFactor: (store) => {
      return store.secondFactor
    },
  },
  actions: {
    setUserInfo(fullName, token, sasToken, secondFactor) {
      this.fullName = fullName
      this.token = token
      this.sasToken = sasToken
      if (secondFactor) {
        this.secondFactor = secondFactor
      }
    },
    logoutUser() {     
      this.fullName = null
      this.token = null
      this.sasToken = null
      this.secondFactor = null
    },
    validate() {
      return new Promise((resolve, reject) => {
        if (!this.token) return resolve(false)
        axios.get("/api/validate", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          }).then((res) => {
            if (res.data.validation) resolve(true)
          }).catch((err) => {
            console.error(err.response.data)
            this.fullName = null
            this.token = null
            this.sasToken = null
            this.secondFactor = null
            resolve(false)
          });
      })
    }
  },
  persist: true,
});

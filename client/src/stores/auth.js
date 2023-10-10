import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    username: null,
    email: null,
    token: null,
    sasToken: null,
    vendor: false,
  }),
  getters: {
    isAuthenticated: (store) => {
      if (store.token === null) return false
      else return true
    },
    getToken: (store) => {
      return store.token;
    },
    getEmail: (store) => {
      return store.email;
    },
    getUser: (store) => {
      return store.username
    },
    getSasToken: (store) => {
      return store.sasToken
    },
    isVendor: (store) => {
      return store.vendor
    }
  },
  actions: {
    setUserInfo(username, email, token, sasToken, isVendor) {
      this.username = username
      this.email = email
      this.token = token
      this.sasToken = sasToken
      this.vendor = isVendor
    },
    logoutUser() {     
      this.username = null
      this.email = null
      this.token = null
      this.sasToken = null
      this.vendor = false
    },
    validate() {
      return new Promise((resolve, reject) => {
        if (!this.token) return resolve(false)
        axios.post("/api/validate",{}, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          }).then((res) => {
            if (res.data.success) return resolve(true)
          }).catch((err) => {
            console.error(err.response.data)
            this.username = null
            this.email = null
            this.token = null
            this.sasToken = null
            this.vendor = false
            resolve(false)
          });
      })
    }
  },
  persist: true,
});

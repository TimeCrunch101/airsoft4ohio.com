import "./assets/websockets.js"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();

import axios from "axios";
if (process.env.NODE_ENV !== "production") {
  axios.defaults.baseURL = "http://localhost:8080";
}

pinia.use(piniaPluginPersistedstate);
const app = createApp(App);

app.component('QuillEditor', QuillEditor)
app.use(pinia);
app.use(router);

app.mount("#app");

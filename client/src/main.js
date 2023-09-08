// Bootstrap
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/js/bootstrap.js"
import editor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
// Custom CSS
import './assets/main.css'




pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(editor)
app.use(pinia)
app.use(router)

app.mount('#app')


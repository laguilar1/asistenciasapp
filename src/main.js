/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Plugins
import { registerPlugins } from '@/plugins'

import './registerServiceWorker'

const app = createApp(App)

registerPlugins(app)

app.use(VueAxios, axios) //axios
app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'

app.mount('#app')

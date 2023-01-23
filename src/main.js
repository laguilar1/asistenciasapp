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
import localForage from "localforage";

// Plugins
import { registerPlugins } from '@/plugins'

import './registerServiceWorker'

// interceptors
import useRequest from './interceptors/useRequest'
import useResponse from './interceptors/useResponse'
const { requestSuccess, requestError } = useRequest()
const { responseSuccess, responseError } = useResponse()

const app = createApp(App)


registerPlugins(app)

// console.log('url back: ',import.meta.env.VITE_URL_BACK);
// axios.create({
//   baseURL: import.meta.env.VITE_URL_BACK,
//   // timeout: 1000,
//   // headers: {'X-Custom-Header': 'foobar'}
// });

app.use(VueAxios, axios) //axios
// app.use(VueAxios, { $myHttp: axios, axios2: axios2 })

axios.interceptors.request.use(requestSuccess, requestError); // interceptor axios
axios.interceptors.response.use(responseSuccess, responseError); // interceptor axios

app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'


app.mount('#app')

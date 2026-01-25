import { createApp } from 'vue'
import { createPinia } from 'pinia'
// Import global styles
import '@/style.css'

import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

// Pinia store setup
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')

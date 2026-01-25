import { createApp } from 'vue'
import { createPinia } from 'pinia'
// Import global styles
import '@/style.css'

import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/features/auth/store/auth.store'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize auth state from localStorage before mounting
const authStore = useAuthStore()
authStore.initializeFromStorage()

app.mount('#app')

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PhosphorVue from '@phosphor-icons/vue'

const app = createApp(App)
app.use(PhosphorVue)
app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    // Afficher une notification de mise à jour disponible
    console.log('Une nouvelle version est disponible!')
  },
  onOfflineReady() {
    // Afficher une notification que l'app est prête pour une utilisation hors ligne
    console.log('L\'application est prête pour une utilisation hors ligne')
  },
})

createApp(App).mount('#app')

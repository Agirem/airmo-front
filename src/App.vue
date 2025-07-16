<template>
  <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
    Chargement...
  </div>
  <div v-else>
    <!-- Debug temporaire -->
    <div class="text-xs text-red-500">
      Route name: {{ route.name }}<br>
      Route path: {{ route.path }}
    </div>
    <!-- Affiche PaymentResultView si on est sur cette route -->
    <router-view v-if="route.name === 'payment-result' || route.path.startsWith('/payment-result')" />
    <!-- Sinon, logique normale -->
    <template v-else>
      <div v-if="!isAuthenticated">
        <!-- Login/Register ici -->
      </div>
      <div v-else>
        <router-view />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { apiService } from './services/api'

const isAuthenticated = ref(false)
const isLoading = ref(true)
const route = useRoute()

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      await apiService.getUserInfo()
      isAuthenticated.value = true
    } catch (e) {
      isAuthenticated.value = false
    }
  }
  isLoading.value = false
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  font-family: 'Inter', system-ui, sans-serif;
}

/* Animations de transition entre les formulaires */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1);
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
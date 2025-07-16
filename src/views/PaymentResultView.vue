<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-slate-100 px-4">
    <div class="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
      <div v-if="status === 'complete'" class="flex flex-col items-center">
        <svg class="h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2l4-4m5 2a9 9 0 11-18 0a9 9 0 0118 0z" />
        </svg>
        <h1 class="text-2xl font-bold text-slate-900 mb-2">Paiement réussi, merci !</h1>
        <p class="text-slate-600 text-center mb-2">Votre paiement a été traité avec succès.</p>
      </div>
      <div v-else-if="status === 'failed'" class="flex flex-col items-center">
        <svg class="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <h1 class="text-2xl font-bold text-slate-900 mb-2">Le paiement a échoué</h1>
        <p class="text-slate-600 text-center mb-2">Le paiement a échoué, veuillez réessayer.</p>
      </div>
      <div v-else class="flex flex-col items-center">
        <svg class="h-16 w-16 text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0a9 9 0 0118 0z" />
        </svg>
        <h1 class="text-2xl font-bold text-slate-900 mb-2">Paiement annulé ou en attente</h1>
        <p class="text-slate-600 text-center mb-2">Le paiement a été annulé ou est en attente.</p>
      </div>
      <div v-if="reference" class="mt-4 bg-slate-50 rounded-lg px-4 py-2 text-slate-700 text-sm w-full text-center">
        <span class="font-medium">Référence transaction :</span> {{ reference }}
      </div>
      <router-link to="/dashboard" class="mt-8 inline-block px-6 py-2 bg-sky-600 text-white rounded-lg shadow hover:bg-sky-700 transition">Retour au tableau de bord</router-link>
      <router-link to="/" class="mt-4 inline-block px-6 py-2 bg-slate-200 text-slate-800 rounded-lg shadow hover:bg-slate-300 transition">Aller à l'accueil</router-link>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const status = computed(() => route.query.status || '')
const reference = computed(() => route.query.reference || '')
</script> 
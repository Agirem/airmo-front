<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="/logo.svg"
        alt="Logo"
      />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-900">
        Créez votre compte
      </h2>
      <p class="mt-2 text-center text-sm text-slate-600">
        Ou
        <router-link
          to="/login"
          class="font-medium text-sky-600 hover:text-sky-500"
        >
          connectez-vous à votre compte existant
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form
          class="space-y-6"
          @submit.prevent="handleSubmit"
        >
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-slate-700"
            >
              Nom complet
            </label>
            <div class="mt-1">
              <input
                id="name"
                v-model="form.name"
                name="name"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                :class="{ 'border-red-300': errors.name }"
              />
              <p
                v-if="errors.name"
                class="mt-2 text-sm text-red-600"
              >
                {{ errors.name }}
              </p>
            </div>
          </div>

          <div>
            <label
              for="phone"
              class="block text-sm font-medium text-slate-700"
            >
              Numéro de téléphone
            </label>
            <div class="mt-1">
              <input
                id="phone"
                v-model="form.phone"
                name="phone"
                type="tel"
                required
                class="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                :class="{ 'border-red-300': errors.phone }"
              />
              <p
                v-if="errors.phone"
                class="mt-2 text-sm text-red-600"
              >
                {{ errors.phone }}
              </p>
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-slate-700"
            >
              Mot de passe
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                :class="{ 'border-red-300': errors.password }"
              />
              <p
                v-if="errors.password"
                class="mt-2 text-sm text-red-600"
              >
                {{ errors.password }}
              </p>
            </div>
          </div>

          <div>
            <label
              for="wallet-type"
              class="block text-sm font-medium text-slate-700"
            >
              Type de portefeuille mobile
            </label>
            <div class="mt-1">
              <select
                id="wallet-type"
                v-model="form.walletType"
                name="wallet-type"
                required
                class="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                :class="{ 'border-red-300': errors.walletType }"
              >
                <option value="">Sélectionnez un type</option>
                <option value="mtn">MTN Mobile Money</option>
                <option value="orange">Orange Money</option>
              </select>
              <p
                v-if="errors.walletType"
                class="mt-2 text-sm text-red-600"
              >
                {{ errors.walletType }}
              </p>
            </div>
          </div>

          <div class="flex items-center">
            <input
              id="terms"
              v-model="form.acceptTerms"
              name="terms"
              type="checkbox"
              required
              class="h-4 w-4 text-sky-600 focus:ring-sky-500 border-slate-300 rounded"
            />
            <label
              for="terms"
              class="ml-2 block text-sm text-slate-900"
            >
              J'accepte les
              <a
                href="#"
                class="font-medium text-sky-600 hover:text-sky-500"
              >
                conditions d'utilisation
              </a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {{ isLoading ? 'Inscription en cours...' : 'Créer mon compte' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const isLoading = ref(false)

const form = reactive({
  name: '',
  phone: '',
  password: '',
  walletType: '',
  acceptTerms: false
})

const errors = reactive({
  name: '',
  phone: '',
  password: '',
  walletType: ''
})

async function handleSubmit() {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  
  // Basic validation
  if (!form.name) {
    errors.name = 'Le nom est requis'
    return
  }
  
  if (!form.phone) {
    errors.phone = 'Le numéro de téléphone est requis'
    return
  }
  
  if (!form.password) {
    errors.password = 'Le mot de passe est requis'
    return
  }
  
  if (!form.walletType) {
    errors.walletType = 'Le type de portefeuille est requis'
    return
  }
  
  if (!form.acceptTerms) {
    return // Le checkbox required s'en occupe
  }
  
  try {
    isLoading.value = true
    await authStore.register({
      name: form.name,
      phone: form.phone,
      password: form.password,
      walletType: form.walletType
    })
  } catch (error) {
    console.error('Registration error:', error)
  } finally {
    isLoading.value = false
  }
}
</script> 
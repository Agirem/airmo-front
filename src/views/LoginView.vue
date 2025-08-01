<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
      <img
        class="mx-auto h-16 w-auto mb-2 drop-shadow-lg"
        src="/airmo.png"
        alt="Logo AirMo"
      />
      <h2 class="mt-2 text-center text-3xl font-extrabold text-slate-900">
        Connectez-vous à votre compte
      </h2>
      <p class="mt-2 text-center text-base text-slate-600 font-medium">
        Bienvenue sur AirMo, votre solution de paiement mobile simple et sécurisée.
      </p>
      <p class="mt-2 text-center text-sm text-slate-600">
        Vous n'avez pas de compte ?
        <router-link
          to="/register"
          class="font-medium text-sky-600 hover:text-sky-500 transition-colors"
        >
          Inscrivez-vous
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-6 shadow-xl sm:rounded-2xl sm:px-10 border border-sky-100">
        <form
          class="space-y-6"
          @submit.prevent="handleSubmit"
        >
          <div>
            <label
              for="phone"
              class="block text-sm font-medium text-slate-700"
            >
              Numéro de téléphone
            </label>
            <div class="mt-1 relative">
              <input
                id="phone"
                v-model="form.phone"
                name="phone"
                type="tel"
                required
                placeholder="Ex: 690123456"
                class="transition-all duration-200 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-500 sm:text-sm"
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
            <div class="mt-1 relative">
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                required
                placeholder="Votre mot de passe"
                class="transition-all duration-200 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-500 sm:text-sm"
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

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.rememberMe"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-sky-600 focus:ring-sky-500 border-slate-300 rounded"
              />
              <label
                for="remember-me"
                class="ml-2 block text-sm text-slate-900"
              >
                Se souvenir de moi
              </label>
            </div>

            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-sky-600 hover:text-sky-500 transition-colors"
              >
                Mot de passe oublié ?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
              {{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}
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
  phone: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  phone: '',
  password: ''
})

async function handleSubmit() {
  // Reset errors
  errors.phone = ''
  errors.password = ''
  
  // Basic validation
  if (!form.phone) {
    errors.phone = 'Le numéro de téléphone est requis'
    return
  }
  
  if (!form.password) {
    errors.password = 'Le mot de passe est requis'
    return
  }
  
  try {
    isLoading.value = true
    await authStore.login(form.phone, form.password)
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
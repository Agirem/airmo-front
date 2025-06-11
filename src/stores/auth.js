import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToastStore } from './toast'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const toastStore = useToastStore()
  
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  
  const isAuthenticated = computed(() => !!token.value)
  
  async function login(phoneNumber, password) {
    try {
      // TODO: Implement actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, password }),
      })
      
      if (!response.ok) {
        throw new Error('Identifiants invalides')
      }
      
      const data = await response.json()
      token.value = data.token
      user.value = data.user
      localStorage.setItem('token', data.token)
      
      toastStore.show({
        type: 'success',
        title: 'Connexion réussie',
        message: 'Bienvenue sur notre plateforme!'
      })
      
      router.push('/dashboard')
    } catch (error) {
      toastStore.show({
        type: 'error',
        title: 'Erreur de connexion',
        message: error.message
      })
      throw error
    }
  }
  
  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    router.push('/login')
    toastStore.show({
      type: 'info',
      title: 'Déconnexion',
      message: 'Vous avez été déconnecté avec succès.'
    })
  }
  
  async function register(userData) {
    try {
      // TODO: Implement actual API call
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription')
      }
      
      const data = await response.json()
      token.value = data.token
      user.value = data.user
      localStorage.setItem('token', data.token)
      
      toastStore.show({
        type: 'success',
        title: 'Inscription réussie',
        message: 'Votre compte a été créé avec succès!'
      })
      
      router.push('/dashboard')
    } catch (error) {
      toastStore.show({
        type: 'error',
        title: 'Erreur d\'inscription',
        message: error.message
      })
      throw error
    }
  }
  
  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    register
  }
}) 
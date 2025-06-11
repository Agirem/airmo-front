import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])
  let id = 0

  function show({ type = 'info', title, message, duration = 5000 }) {
    const toast = {
      id: ++id,
      type,
      title,
      message,
    }
    
    toasts.value.push(toast)
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(toast.id)
      }, duration)
    }
    
    return toast.id
  }
  
  function removeToast(id) {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }
  
  return {
    toasts,
    show,
    removeToast
  }
}) 
<template>
  <div
    :class="[
      'max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1',
      {
        'ring-green-500/10': toast.type === 'success',
        'ring-red-500/10': toast.type === 'error',
        'ring-amber-500/10': toast.type === 'warning',
        'ring-sky-500/10': toast.type === 'info'
      }
    ]"
  >
    <div class="p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <CheckCircleIcon
            v-if="toast.type === 'success'"
            class="h-6 w-6 text-green-500"
            aria-hidden="true"
          />
          <ExclamationCircleIcon
            v-else-if="toast.type === 'error'"
            class="h-6 w-6 text-red-500"
            aria-hidden="true"
          />
          <ExclamationIcon
            v-else-if="toast.type === 'warning'"
            class="h-6 w-6 text-amber-500"
            aria-hidden="true"
          />
          <InformationCircleIcon
            v-else
            class="h-6 w-6 text-sky-500"
            aria-hidden="true"
          />
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-medium text-slate-900">
            {{ toast.title }}
          </p>
          <p
            v-if="toast.message"
            class="mt-1 text-sm text-slate-500"
          >
            {{ toast.message }}
          </p>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
          <button
            type="button"
            class="bg-white rounded-md inline-flex text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            @click="$emit('close')"
          >
            <span class="sr-only">Fermer</span>
            <XIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XIcon
} from '@heroicons/vue/solid'

defineProps({
  toast: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])
</script> 
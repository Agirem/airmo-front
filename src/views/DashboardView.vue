<template>
  <div class="min-h-screen bg-slate-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-slate-900">
          Bonjour, {{ user?.name }}!
        </h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Actions principales -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
        <button
          @click="showSellModal = true"
          class="relative group bg-white px-6 py-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center space-x-3"
        >
          <div class="flex-shrink-0">
            <div class="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <ArrowUpIcon class="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="focus:outline-none">
              <p class="text-lg font-medium text-slate-900">
                Vendre mon crédit
              </p>
              <p class="text-sm text-slate-500">
                Vendez votre crédit de communication
              </p>
            </div>
          </div>
          <div class="flex-shrink-0 self-center">
            <ChevronRightIcon class="h-5 w-5 text-slate-400 group-hover:text-slate-500" />
          </div>
        </button>

        <button
          @click="showBuyModal = true"
          class="relative group bg-white px-6 py-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center space-x-3"
        >
          <div class="flex-shrink-0">
            <div class="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center">
              <ArrowDownIcon class="h-6 w-6 text-sky-600" />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="focus:outline-none">
              <p class="text-lg font-medium text-slate-900">
                Acheter du crédit
              </p>
              <p class="text-sm text-slate-500">
                Achetez du crédit à prix réduit
              </p>
            </div>
          </div>
          <div class="flex-shrink-0 self-center">
            <ChevronRightIcon class="h-5 w-5 text-slate-400 group-hover:text-slate-500" />
          </div>
        </button>
      </div>

      <!-- Stock actuel -->
      <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-slate-200 mb-6">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-slate-900">
            Stock actuel
          </h3>
          <p class="mt-1 text-sm text-slate-500">
            Crédit disponible pour l'achat
          </p>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <dl class="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div class="bg-slate-50 px-4 py-5 sm:p-6 rounded-lg">
              <dt class="text-sm font-medium text-slate-500 truncate">
                Crédit MTN
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-slate-900">
                {{ formatAmount(stock.mtn) }} F
              </dd>
            </div>
            <div class="bg-slate-50 px-4 py-5 sm:p-6 rounded-lg">
              <dt class="text-sm font-medium text-slate-500 truncate">
                Crédit Orange
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-slate-900">
                {{ formatAmount(stock.orange) }} F
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Transactions récentes -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 class="text-lg leading-6 font-medium text-slate-900">
              Transactions récentes
            </h3>
            <p class="mt-1 text-sm text-slate-500">
              Vos dernières opérations
            </p>
          </div>
          <router-link
            to="/transactions"
            class="text-sm font-medium text-sky-600 hover:text-sky-500"
          >
            Voir tout
          </router-link>
        </div>
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full divide-y divide-slate-200">
                  <thead class="bg-slate-50">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                      >
                        Montant
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                      >
                        Statut
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-slate-200">
                    <tr
                      v-for="transaction in recentTransactions"
                      :key="transaction.id"
                      class="hover:bg-slate-50"
                    >
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div
                            :class="[
                              'flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center',
                              {
                                'bg-emerald-100': transaction.type === 'sell',
                                'bg-sky-100': transaction.type === 'buy'
                              }
                            ]"
                          >
                            <ArrowUpIcon
                              v-if="transaction.type === 'sell'"
                              class="h-4 w-4 text-emerald-600"
                            />
                            <ArrowDownIcon
                              v-else
                              class="h-4 w-4 text-sky-600"
                            />
                          </div>
                          <div class="ml-4">
                            <div class="text-sm font-medium text-slate-900">
                              {{ transaction.type === 'sell' ? 'Vente' : 'Achat' }}
                            </div>
                            <div class="text-sm text-slate-500">
                              {{ transaction.operator }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-slate-900">
                          {{ formatAmount(transaction.amount) }} F
                        </div>
                        <div class="text-sm text-slate-500">
                          {{ formatAmount(transaction.finalAmount) }} F reçu
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span
                          :class="[
                            'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                            {
                              'bg-green-100 text-green-800': transaction.status === 'completed',
                              'bg-yellow-100 text-yellow-800': transaction.status === 'pending',
                              'bg-red-100 text-red-800': transaction.status === 'failed'
                            }
                          ]"
                        >
                          {{ formatStatus(transaction.status) }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {{ formatDate(transaction.date) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal de vente -->
    <TransitionRoot
      appear
      :show="showSellModal"
      as="template"
    >
      <Dialog
        as="div"
        class="relative z-10"
        @close="showSellModal = false"
      >
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                    <ArrowUpIcon
                      class="h-6 w-6 text-emerald-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-slate-900"
                    >
                      Vendre du crédit
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-slate-500">
                        Choisissez l'opérateur et le montant que vous souhaitez vendre.
                      </p>
                    </div>
                  </div>
                </div>

                <form
                  class="mt-5 sm:mt-6"
                  @submit.prevent="handleSell"
                >
                  <div class="space-y-4">
                    <div>
                      <label
                        for="sell-operator"
                        class="block text-sm font-medium text-slate-700"
                      >
                        Opérateur
                      </label>
                      <select
                        id="sell-operator"
                        v-model="sellForm.operator"
                        name="operator"
                        class="mt-1 block w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                      >
                        <option value="mtn">MTN</option>
                        <option value="orange">Orange</option>
                      </select>
                    </div>

                    <div>
                      <label
                        for="sell-amount"
                        class="block text-sm font-medium text-slate-700"
                      >
                        Montant à vendre
                      </label>
                      <div class="relative mt-1 rounded-md shadow-sm">
                        <input
                          id="sell-amount"
                          v-model.number="sellForm.amount"
                          type="number"
                          name="amount"
                          class="block w-full rounded-md border-slate-300 pl-3 pr-12 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                          placeholder="0"
                        />
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span class="text-slate-500 sm:text-sm">F</span>
                        </div>
                      </div>
                      <p class="mt-2 text-sm text-slate-500">
                        Vous recevrez environ
                        <span class="font-medium text-slate-700">
                          {{ formatAmount(calculateFinalAmount(sellForm.amount)) }} F
                        </span>
                      </p>
                    </div>
                  </div>

                  <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      class="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:col-start-2"
                      :disabled="isLoading"
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
                      Vendre
                    </button>
                    <button
                      type="button"
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:col-start-1 sm:mt-0"
                      @click="showSellModal = false"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Modal d'achat -->
    <TransitionRoot
      appear
      :show="showBuyModal"
      as="template"
    >
      <Dialog
        as="div"
        class="relative z-10"
        @close="showBuyModal = false"
      >
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">
                    <ArrowDownIcon
                      class="h-6 w-6 text-sky-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-slate-900"
                    >
                      Acheter du crédit
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-slate-500">
                        Choisissez l'opérateur et le montant que vous souhaitez acheter.
                      </p>
                    </div>
                  </div>
                </div>

                <form
                  class="mt-5 sm:mt-6"
                  @submit.prevent="handleBuy"
                >
                  <div class="space-y-4">
                    <div>
                      <label
                        for="buy-operator"
                        class="block text-sm font-medium text-slate-700"
                      >
                        Opérateur
                      </label>
                      <select
                        id="buy-operator"
                        v-model="buyForm.operator"
                        name="operator"
                        class="mt-1 block w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                      >
                        <option value="mtn">MTN ({{ formatAmount(stock.mtn) }} F disponible)</option>
                        <option value="orange">Orange ({{ formatAmount(stock.orange) }} F disponible)</option>
                      </select>
                    </div>

                    <div>
                      <label
                        for="buy-amount"
                        class="block text-sm font-medium text-slate-700"
                      >
                        Montant à acheter
                      </label>
                      <div class="relative mt-1 rounded-md shadow-sm">
                        <input
                          id="buy-amount"
                          v-model.number="buyForm.amount"
                          type="number"
                          name="amount"
                          class="block w-full rounded-md border-slate-300 pl-3 pr-12 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                          placeholder="0"
                        />
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span class="text-slate-500 sm:text-sm">F</span>
                        </div>
                      </div>
                      <p class="mt-2 text-sm text-slate-500">
                        Vous paierez
                        <span class="font-medium text-slate-700">
                          {{ formatAmount(calculateBuyAmount(buyForm.amount)) }} F
                        </span>
                      </p>
                    </div>
                  </div>

                  <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      class="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:col-start-2"
                      :disabled="isLoading"
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
                      Acheter
                    </button>
                    <button
                      type="button"
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:col-start-1 sm:mt-0"
                      @click="showBuyModal = false"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChevronRightIcon
} from '@heroicons/vue/solid'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'

const authStore = useAuthStore()
const toastStore = useToastStore()
const user = computed(() => authStore.user)

const showSellModal = ref(false)
const showBuyModal = ref(false)
const isLoading = ref(false)

// Données simulées pour le stock
const stock = reactive({
  mtn: 7000,
  orange: 12500
})

// Données simulées pour les transactions récentes
const recentTransactions = ref([
  {
    id: 1,
    type: 'sell',
    operator: 'MTN',
    amount: 2000,
    finalAmount: 1700,
    status: 'completed',
    date: new Date(2024, 2, 10, 14, 30)
  },
  {
    id: 2,
    type: 'buy',
    operator: 'Orange',
    amount: 5000,
    finalAmount: 4750,
    status: 'pending',
    date: new Date(2024, 2, 10, 12, 15)
  },
  {
    id: 3,
    type: 'sell',
    operator: 'Orange',
    amount: 1000,
    finalAmount: 850,
    status: 'failed',
    date: new Date(2024, 2, 9, 18, 45)
  }
])

const sellForm = reactive({
  operator: 'mtn',
  amount: null
})

const buyForm = reactive({
  operator: 'mtn',
  amount: null
})

// Fonctions utilitaires
function formatAmount(amount) {
  return new Intl.NumberFormat('fr-FR').format(amount || 0)
}

function formatDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

function formatStatus(status) {
  const statusMap = {
    completed: 'Terminée',
    pending: 'En attente',
    failed: 'Échouée'
  }
  return statusMap[status] || status
}

function calculateFinalAmount(amount) {
  // Simulation: 15% de commission
  return amount ? Math.floor(amount * 0.85) : 0
}

function calculateBuyAmount(amount) {
  // Simulation: 5% de réduction
  return amount ? Math.floor(amount * 0.95) : 0
}

async function handleSell() {
  if (!sellForm.amount || sellForm.amount <= 0) {
    toastStore.show({
      type: 'error',
      title: 'Erreur',
      message: 'Veuillez entrer un montant valide'
    })
    return
  }

  try {
    isLoading.value = true
    // TODO: Implement actual API call
    await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
    
    toastStore.show({
      type: 'success',
      title: 'Demande enregistrée',
      message: `Veuillez transférer ${formatAmount(sellForm.amount)} F au numéro suivant: 123456789`
    })
    
    showSellModal.value = false
    sellForm.amount = null
  } catch (error) {
    toastStore.show({
      type: 'error',
      title: 'Erreur',
      message: 'Une erreur est survenue lors de la vente'
    })
  } finally {
    isLoading.value = false
  }
}

async function handleBuy() {
  if (!buyForm.amount || buyForm.amount <= 0) {
    toastStore.show({
      type: 'error',
      title: 'Erreur',
      message: 'Veuillez entrer un montant valide'
    })
    return
  }

  const availableStock = buyForm.operator === 'mtn' ? stock.mtn : stock.orange
  if (buyForm.amount > availableStock) {
    toastStore.show({
      type: 'error',
      title: 'Stock insuffisant',
      message: `Le stock disponible est de ${formatAmount(availableStock)} F`
    })
    return
  }

  try {
    isLoading.value = true
    // TODO: Implement actual API call and NotchPay integration
    await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
    
    toastStore.show({
      type: 'success',
      title: 'Achat effectué',
      message: 'Le crédit sera transféré dans quelques instants'
    })
    
    showBuyModal.value = false
    buyForm.amount = null
  } catch (error) {
    toastStore.show({
      type: 'error',
      title: 'Erreur',
      message: 'Une erreur est survenue lors de l\'achat'
    })
  } finally {
    isLoading.value = false
  }
}
</script> 
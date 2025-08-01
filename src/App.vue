<template>
  <!-- Pages d'authentification -->
  <div v-if="!isAuthenticated" class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
        {{ currentView === 'login' ? 'Connexion' : 'Créer un compte' }}
      </h2>
      <p class="mt-2 text-center text-sm text-slate-600">
        {{ currentView === 'login' ? 'Ou ' : 'Ou ' }}
        <button
          class="font-medium text-sky-600 hover:text-sky-500"
          @click="switchView(currentView === 'login' ? 'register' : 'login')"
        >
          {{ currentView === 'login' ? 'créez un nouveau compte' : 'connectez-vous à votre compte' }}
        </button>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="card p-8">
        <!-- Formulaire de connexion -->
        <form v-if="currentView === 'login'" class="space-y-6" @submit="handleLogin">
          <div>
            <label for="phone" class="input-label">
              Numéro de téléphone
            </label>
            <div class="mt-1">
              <input
                id="phone"
                v-model="loginForm.phone"
                name="phone"
                type="tel"
                required
                class="input-field"
                placeholder="Ex: 6XXXXXXXX"
              />
            </div>
          </div>

          <div>
            <label for="password" class="input-label">
              Mot de passe
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="loginForm.password"
                name="password"
                type="password"
                required
                class="input-field"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
              <label for="remember-me" class="ml-2 block text-sm text-slate-900">
                Se souvenir de moi
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-sky-600 hover:text-sky-500">
                Mot de passe oublié?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="btn-primary w-full flex justify-center"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="inline-flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion en cours...
              </span>
              <span v-else>Se connecter</span>
            </button>
          </div>
        </form>

        <!-- Formulaire d'inscription -->
        <form v-else class="space-y-6" @submit="handleRegister">
          <!-- Nom complet -->
          <div>
            <label for="name" class="input-label">
              Nom complet
            </label>
            <div class="mt-1">
              <input
                id="name"
                v-model="registerForm.name"
                name="name"
                type="text"
                required
                class="input-field"
                placeholder="Ex: John Doe"
              />
            </div>
          </div>

          <!-- Numéro de téléphone -->
          <div>
            <label for="register-phone" class="input-label">
              Numéro de téléphone
            </label>
            <div class="mt-1">
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  +237
                </span>
                <input
                  id="register-phone"
                  v-model="registerForm.phone"
                  name="phone"
                  type="tel"
                  required
                  maxlength="9"
                  class="input-field pl-14"
                  placeholder="6XXXXXXXX"
                />
              </div>
            </div>
          </div>

          <!-- Opérateur -->
          <div>
            <label for="operator" class="input-label">
              Opérateur principal
            </label>
            <div class="mt-1">
              <select
                id="operator"
                v-model="registerForm.operator"
                name="operator"
                class="input-field"
                required
              >
                <option value="mtn">MTN Mobile Money</option>
                <option value="orange">Orange Money</option>
              </select>
            </div>
          </div>

          <!-- Mot de passe -->
          <div>
            <label for="register-password" class="input-label">
              Mot de passe
            </label>
            <div class="mt-1">
              <input
                id="register-password"
                v-model="registerForm.password"
                name="password"
                type="password"
                required
                class="input-field"
                placeholder="••••••••"
              />
            </div>
          </div>

          <!-- Confirmation mot de passe -->
          <div>
            <label for="confirm-password" class="input-label">
              Confirmer le mot de passe
            </label>
            <div class="mt-1">
              <input
                id="confirm-password"
                v-model="registerForm.confirmPassword"
                name="confirm-password"
                type="password"
                required
                class="input-field"
                placeholder="••••••••"
              />
            </div>
          </div>

          <!-- Conditions d'utilisation -->
          <div class="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              class="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <label for="terms" class="ml-2 block text-sm text-slate-900">
              J'accepte les
              <a href="#" class="font-medium text-sky-600 hover:text-sky-500">
                conditions d'utilisation
              </a>
            </label>
          </div>

          <!-- Bouton d'inscription -->
          <div>
            <button
              type="submit"
              class="btn-primary w-full flex justify-center"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="inline-flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Inscription en cours...
              </span>
              <span v-else>S'inscrire</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Page principale -->
  <div v-else class="min-h-screen bg-slate-50">
    <!-- Loader -->
    <div v-if="isLoading" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-8 flex flex-col items-center">
        <svg class="animate-spin h-10 w-10 text-sky-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-slate-900 font-medium">Chargement en cours...</p>
      </div>
    </div>

    <!-- En-tête avec informations utilisateur -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo et titre -->
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img src="/airmo.png" alt="AirMo Logo" class="h-8 w-8" />
            </div>
            <div class="hidden md:block ml-4">
              <h1 class="text-xl font-semibold text-slate-900">
                AirMo
              </h1>
            </div>
          </div>

          <!-- Menu utilisateur -->
          <div class="flex items-center">
            <!-- Menu déroulant utilisateur -->
            <div class="relative ml-3">
              <div>
                <button
                  @click="showUserMenu = !showUserMenu"
                  class="flex items-center max-w-xs bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  <div class="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center">
                    <span class="text-sm font-medium text-sky-600">{{ user?.name?.charAt(0) || 'U' }}</span>
                  </div>
                  <div class="hidden md:flex flex-col ml-3 text-left">
                    <span class="text-sm font-medium text-slate-900">{{ user?.name }}</span>
                    <span class="text-xs text-slate-500">{{ user?.phone_number }}</span>
                  </div>
                  <svg class="hidden md:block ml-2 h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>

              <!-- Menu déroulant -->
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="showUserMenu"
                  class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                >
                  <div class="py-1">
                    <!-- Informations utilisateur sur mobile -->
                    <div class="md:hidden px-4 py-2 border-b border-slate-100">
                      <p class="text-sm font-medium text-slate-900">{{ user?.name }}</p>
                      <p class="text-xs text-slate-500">{{ user?.phone_number }}</p>
                    </div>
                
                    <button
                      @click="showHistory"
                      class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                      </svg>
                      <span>Historique</span>
                    </button>
                
                    <button
                      @click="handleLogout"
                      class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenu principal -->
    <main class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stock disponible -->
      <div class="grid grid-cols-3 gap-4 mb-8">
        <div class="bg-slate-100 rounded-2xl p-4 sm:p-6 border border-slate-200 opacity-75 cursor-not-allowed">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <span class="text-amber-600 font-medium">M</span>
            </div>
            <div>
              <h3 class="text-sm font-medium text-slate-900">MTN</h3>
              <p class="text-xs text-slate-500">Service indisponible</p>
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-xl sm:text-2xl font-bold text-slate-400">{{ formatAmount(stock.mtn) }} F</p>
            <p class="text-xs text-red-600">
              Service temporairement indisponible en raison d'une instabilité du réseau
            </p>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-orange-50 flex items-center justify-center">
              <span class="text-orange-600 font-medium">O</span>
            </div>
            <div>
              <h3 class="text-sm font-medium text-slate-900">Orange</h3>
              <p class="text-xs text-slate-500">Stock disponible</p>
            </div>
          </div>
          <p class="text-xl sm:text-2xl font-bold text-slate-900">{{ formatAmount(stock.orange) }} F</p>
        </div>

        <div class="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-100 flex items-center justify-center">
              <span class="text-slate-600 font-medium">N</span>
            </div>
            <div>
              <h3 class="text-sm font-medium text-slate-900">Solde Convertissable</h3>
              <p class="text-xs text-slate-500">Solde disponible</p>
            </div>
          </div>
          <p class="text-xl sm:text-2xl font-bold text-slate-900">{{ formatAmount(notchPayBalance) }} F</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <!-- Vendre -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-slate-900">Vendre du crédit</h2>
              <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <form @submit.prevent="handleSell" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700">Opérateur</label>
                <select
                  v-model="sellForm.operator"
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 rounded-lg"
                >
                  <option value="mtn">MTN</option>
                  <option value="orange">Orange</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700">Montant</label>
                <div class="mt-1 relative rounded-lg">
                  <input
                    type="number"
                    v-model.number="sellForm.amount"
                    class="block w-full pl-3 pr-12 py-2 border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                    placeholder="0"
                    :disabled="showCallButton"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-slate-500">F</span>
                  </div>
                </div>
                <p class="mt-2 text-sm text-slate-600">
                  Vous recevrez: <span class="font-medium text-slate-900">{{ formatAmount(calculateFinalAmount(sellForm.amount)) }} F</span>
                </p>
              </div>
              <Transition name="fade-slide">
                <div v-if="sellForm.operator === 'mtn'" class="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 mb-2 flex items-start gap-2">
                  <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"/></svg>
                  <span class="text-sm">
                    Pour transférer du crédit MTN, vous devez avoir créé un code Me2U à 4 chiffres.<br>
                    Si ce n'est pas fait, composez d'abord <b>*150*9999*CodeMe2U#</b> puis vous pourrez faire votre transfert.
                  </span>
                </div>
              </Transition>
              <button
                v-if="!showCallButton"
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                :disabled="isLoading || !sellForm.amount"
              >
                <span v-if="isLoading" class="inline-flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Traitement...
                </span>
                <span v-else>Vendre</span>
              </button>
              <button
                v-else
                type="button"
                @click="callRecipient"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h0a2.25 2.25 0 002.25-2.25v-2.386a2.25 2.25 0 00-1.687-2.183l-2.482-.62a2.25 2.25 0 00-2.71 1.03l-.37.617a11.048 11.048 0 01-4.943-4.943l.617-.37a2.25 2.25 0 001.03-2.71l-.62-2.482A2.25 2.25 0 006.886 2.25H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Appeler maintenant
              </button>
            </form>
          </div>
        </div>

        <!-- Acheter -->
        <div class="bg-slate-100 rounded-2xl shadow-sm border border-slate-200 overflow-hidden opacity-75 cursor-not-allowed">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-slate-900">Acheter du crédit</h2>
              <div class="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-sky-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <form @submit.prevent="handleBuy" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700">Opérateur</label>
                <select
                  v-model="buyForm.operator"
                  disabled
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 bg-slate-50 cursor-not-allowed rounded-lg"
                >
                  <option value="mtn">MTN ({{ formatAmount(stock.mtn) }} F disponible)</option>
                  <option value="orange">Orange ({{ formatAmount(stock.orange) }} F disponible)</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700">Montant</label>
                <div class="mt-1 relative rounded-lg">
                  <input
                    type="number"
                    v-model.number="buyForm.amount"
                    disabled
                    class="block w-full pl-3 pr-12 py-2 border border-slate-300 bg-slate-50 cursor-not-allowed rounded-lg"
                    placeholder="0"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-slate-500">F</span>
                  </div>
                </div>
                <p class="mt-2 text-sm text-slate-600">
                  À payer: <span class="font-medium text-slate-400">{{ formatAmount(calculateBuyAmount(buyForm.amount)) }} F</span>
                </p>
              </div>
              <p class="text-xs text-red-600">
                Service temporairement indisponible en raison d'une instabilité du réseau
              </p>
              <button
                type="submit"
                disabled
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-slate-400 cursor-not-allowed"
              >
                <span>Acheter</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>

    <!-- Notifications -->
    <div class="fixed bottom-4 right-4 space-y-2 z-50">
      <TransitionGroup
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto overflow-hidden"
          :class="{
            'border-l-4 border-emerald-500': toast.type === 'success',
            'border-l-4 border-red-500': toast.type === 'error'
          }"
        >
          <div class="p-4">
            <div class="flex items-center">
              <div class="flex-1 w-0">
                <p class="text-sm font-medium text-slate-900">
                  {{ toast.message }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  @click="removeToast(toast.id)"
                  class="rounded-md inline-flex text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <span class="sr-only">Fermer</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
      
    </div>
    </div>
    <!-- Modale d'historique -->
<div v-if="showHistoryModal" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
  <div class="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-slate-900">Historique des transactions</h2>
      <button
        @click="showHistoryModal = false"
        class="text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg p-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
<div class="flex gap-4 mb-4">
  <!-- Filtre par opérateur -->
  <div class="flex-1">
    <select
      v-model="filterOperator"
      class="w-full rounded-lg border-slate-200 text-sm focus:border-sky-500 focus:ring-sky-500"
    >
      <option value="">Tous les opérateurs</option>
      <option value="mtn">MTN</option>
      <option value="orange">Orange</option>
    </select>
  </div>
  
  <!-- Filtre par type -->
  <div class="flex-1">
    <select
      v-model="filterType"
      class="w-full rounded-lg border-slate-200 text-sm focus:border-sky-500 focus:ring-sky-500"
    >
      <option value="">Tous les types</option>
      <option value="achat">Achat</option>
      <option value="vente">Vente</option>
    </select>
  </div>
</div>
    <div class="space-y-4">
      <div v-for="transaction in filteredHistory" :key="transaction.payment_reference || Math.random()" class="bg-white rounded-lg border border-slate-200 p-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-slate-500">Type</p>
            <p class="font-medium" :class="{
              'text-emerald-600': transaction.type === 'achat',
              'text-sky-600': transaction.type === 'vente'
            }">{{ transaction.type === 'achat' ? 'Achat' : 'Vente' }}</p>
          </div>
          <div>
            <p class="text-sm text-slate-500">Opérateur</p>
            <p class="font-medium" :class="{
              'text-yellow-600': transaction.operator.toLowerCase() === 'mtn',
              'text-orange-600': transaction.operator.toLowerCase() === 'orange'
            }">{{ transaction.operator }}</p>
          </div>
          <div>
            <p class="text-sm text-slate-500">Statut</p>
            <p class="font-medium" :class="{
              'text-emerald-600': transaction.status === 'success',
              'text-red-600': transaction.status === 'failed',
              'text-amber-600': transaction.status === 'pending'
            }">{{ transaction.status }}</p>
          </div>
          <div>
            <p class="text-sm text-slate-500">Référence</p>
            <p class="font-medium text-slate-900">{{ transaction.payment_reference || 'N/A' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>

  
  
</template>

<script setup>
import { ref, reactive, TransitionGroup, onMounted, computed } from 'vue'
import { apiService } from './services/api'

// État local
const isLoading = ref(false)
const toasts = ref([])
let toastId = 0

// État pour la modale d'historique
const showHistoryModal = ref(false)
const transactionHistory = ref([])
// Filtres pour l'historique
const filterOperator = ref('')
const filterType = ref('')

// Historique filtré
const filteredHistory = computed(() => {
  return transactionHistory.value.filter(transaction => {
    const matchOperator = !filterOperator.value || transaction.operator.toLowerCase() === filterOperator.value
    const matchType = !filterType.value || transaction.type === filterType.value
    return matchOperator && matchType
  })
})

// État d'authentification et navigation
const isAuthenticated = ref(false)
const currentView = ref('login')
const user = ref(null)

const loginForm = reactive({
  phone: '',
  password: ''
})

const registerForm = reactive({
  name: '',
  phone: '',
  password: '',
  confirmPassword: '',
  operator: 'mtn'
})

const stock = reactive({
  mtn: 0,
  orange: 0
})

const sellForm = reactive({
  operator: 'mtn',
  amount: null
})

const buyForm = reactive({
  operator: 'mtn',
  amount: null
})

// Ajout de l'état pour le menu utilisateur
const showUserMenu = ref(false)

// Vérifier l'authentification au chargement
onMounted(async () => {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      isLoading.value = true
      const userData = await apiService.getUserInfo()
      user.value = userData
      isAuthenticated.value = true
      await refreshStock()
      await refreshNotchPayBalance()
    } catch (error) {
      apiService.clearToken()
      isAuthenticated.value = false
    } finally {
      isLoading.value = false
    }
  }
})

// Fonctions utilitaires
function formatAmount(amount) {
  return new Intl.NumberFormat('fr-FR').format(amount || 0)
}

function calculateFinalAmount(amount) {
  return amount ? Math.floor(amount * 0.85) : 0
}

function calculateBuyAmount(amount) {
  return amount ? Math.floor(amount * 1.05) : 0
}

function showToast(message, type = 'success') {
  const toast = {
    id: ++toastId,
    message,
    type
  }
  toasts.value.push(toast)
  setTimeout(() => removeToast(toast.id), 5000)
}

function removeToast(id) {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

// Rafraîchir le stock
async function refreshStock() {
  try {
    const stockData = await apiService.getStock()
    stockData.forEach(item => {
      stock[item.operator.toLowerCase()] = item.balance
    })
  } catch (error) {
    showToast('Erreur lors de la récupération du stock', 'error')
  }
}

// Gestionnaires d'événements
const showCallButton = ref(false)
const numeroDestinataire = ref('')

function callRecipient() {
  const numero = numeroDestinataire.value
  const montant = sellForm.amount
  const operateur = sellForm.operator

  if (operateur === 'mtn') {
    // Format USSD pour MTN : #144*Numéro*Montant#
    const ussd = `#144*${numero}*${montant}#`
    setTimeout(() => {
      window.location.href = `tel:${encodeURIComponent(ussd)}`
    }, 1500) // Laisse le temps à l'utilisateur de lire l'info
  } else if (operateur === 'orange') {
    // Format USSD pour Orange : *150*Montant*Numéro#
    const ussd = `*150*${montant}*${numero}#`
    window.location.href = `tel:${encodeURIComponent(ussd)}`
  }
}

async function handleSell() {
  if (!sellForm.amount || sellForm.amount <= 0) {
    showToast('Veuillez entrer un montant valide', 'error')
    return
  }

  try {
    isLoading.value = true
    const response = await apiService.initiateSell({
      operator: sellForm.operator,
      amount: sellForm.amount
    })
    
    showToast(`${response.message} Veuillez transférer ${formatAmount(response.transaction.amount)} F au ${response.transfer_to_number}`)
    sellForm.amount = null
    await refreshStock()
    // Affiche le bouton d'appel avec le numéro à appeler
    numeroDestinataire.value = response.transfer_to_number
    showCallButton.value = true
  } catch (error) {
    showToast(error.message || 'Une erreur est survenue', 'error')
  } finally {
    isLoading.value = false
  }
}

async function handleBuy() {
  if (!buyForm.amount || buyForm.amount <= 0) {
    showToast('Veuillez entrer un montant valide', 'error')
    return
  }

  const availableStock = buyForm.operator === 'mtn' ? stock.mtn : stock.orange
  if (buyForm.amount > availableStock) {
    showToast(`Stock insuffisant (${formatAmount(availableStock)} F disponible)`, 'error')
    return
  }

  try {
    isLoading.value = true
    const response = await apiService.initiateBuy({
      operator: buyForm.operator,
      amount: buyForm.amount
    })

    if (response.authorization_url) {
      window.location.href = response.authorization_url
      return // On ne fait rien d'autre, la redirection prend le relais
    }

    // Si pas d'URL, on affiche le message de l'API
    showToast(response.message || "Erreur lors de l'initialisation du paiement", 'error')
  } catch (error) {
    showToast(error.message || 'Une erreur est survenue', 'error')
  } finally {
    isLoading.value = false
  }
}

// Fonction de connexion
async function handleLogin(e) {
  e.preventDefault()
  
  if (!loginForm.phone || !loginForm.password) {
    showToast('Veuillez remplir tous les champs', 'error')
    return
  }

  try {
    isLoading.value = true
    const response = await apiService.login({
      phone: loginForm.phone,
      password: loginForm.password
    })
    
    user.value = response.user
    isAuthenticated.value = true
    showToast(response.message || 'Connexion réussie')
  } catch (error) {
    showToast(error.message || 'Erreur lors de la connexion', 'error')
  } finally {
    isLoading.value = false
  }
}

// Fonction de déconnexion
async function handleLogout() {
  try {
    await apiService.logout()
    user.value = null
    isAuthenticated.value = false
    showToast('Vous avez été déconnecté')
  } catch (error) {
    showToast('Erreur lors de la déconnexion', 'error')
  }
}

// Fonction d'inscription
async function handleRegister(e) {
  e.preventDefault()
  
  if (!registerForm.name || !registerForm.phone || !registerForm.password || !registerForm.confirmPassword) {
    showToast('Veuillez remplir tous les champs', 'error')
    return
  }

  if (registerForm.password !== registerForm.confirmPassword) {
    showToast('Les mots de passe ne correspondent pas', 'error')
    return
  }

  if (registerForm.password.length < 8) {
    showToast('Le mot de passe doit faire au moins 8 caractères', 'error')
    return
  }

  if (registerForm.phone.length !== 9) {
    showToast('Le numéro de téléphone doit contenir 9 chiffres', 'error')
    return
  }

  try {
    isLoading.value = true
    const response = await apiService.register({
      name: registerForm.name,
      phone: registerForm.phone,
      password: registerForm.password
    })
    
    // Connexion automatique après inscription réussie
    await apiService.login({
      phone: registerForm.phone,
      password: registerForm.password
    })
    
    user.value = response.user
    isAuthenticated.value = true
    showToast(response.message || 'Inscription réussie ! Bienvenue.')
  } catch (error) {
    showToast(error.message || 'Erreur lors de l\'inscription', 'error')
  } finally {
    isLoading.value = false
  }
}

// Navigation entre login et register
function switchView(view) {
  currentView.value = view
  // Réinitialiser les formulaires
  loginForm.phone = ''
  loginForm.password = ''
  registerForm.name = ''
  registerForm.phone = ''
  registerForm.password = ''
  registerForm.confirmPassword = ''
}

// Dans la section script, après la déclaration des autres refs
const notchPayBalance = ref(0)

async function refreshNotchPayBalance() {
  try {
    const balance = await apiService.getNotchPayBalance()
    notchPayBalance.value = balance
  } catch (error) {
    showToast('Erreur lors de la récupération du solde NotchPay', 'error')
  }
}

// Fonction pour afficher l'historique
async function showHistory() {
  try {
    isLoading.value = true
    const data = await apiService.getTransactionHistory()
    transactionHistory.value = data.map(transaction => ({
      type: transaction.type,
      operator: transaction.operator,
      status: transaction.status,
      payment_reference: transaction.payment_reference
    }))
    showHistoryModal.value = true
  } catch (error) {
    showToast(error.message || 'Erreur lors de la récupération de l\'historique', 'error')
  } finally {
    isLoading.value = false
  }
}
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
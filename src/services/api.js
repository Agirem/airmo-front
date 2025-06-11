const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token')
  }

  setToken(token) {
    this.token = token
    localStorage.setItem('token', token)
  }

  clearToken() {
    this.token = null
    localStorage.removeItem('token')
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    return headers
  }

  async register(userData) {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        name: userData.name,
        phone_number: `+237${userData.phone}`,
        password: userData.password
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Erreur lors de l\'inscription')
    }

    return response.json()
  }

  async login(credentials) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        phone_number: `+237${credentials.phone}`,
        password: credentials.password
      })
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Identifiants incorrects')
      }
      throw new Error('Erreur lors de la connexion')
    }

    const data = await response.json()
    this.setToken(data.access_token)
    return data
  }

  async logout() {
    if (!this.token) return

    try {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: this.getHeaders()
      })
    } finally {
      this.clearToken()
    }
  }

  async getUserInfo() {
    const response = await fetch(`${API_URL}/user`, {
      headers: this.getHeaders()
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des informations utilisateur')
    }

    return response.json()
  }

  async getStock() {
    const response = await fetch(`${API_URL}/stock`, {
      headers: this.getHeaders()
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du stock')
    }

    return response.json()
  }

  async initiateSell({ operator, amount }) {
    const formattedOperator = operator === 'mtn' ? 'MTN' : 'Orange'

    const response = await fetch(`${API_URL}/sell/initiate`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        operator: formattedOperator,
        amount: Number(amount)
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Erreur initiateSell:', {
        status: response.status,
        statusText: response.statusText,
        error,
        sentData: {
          operator: formattedOperator,
          amount: Number(amount)
        }
      })
      throw new Error(error.message || `Erreur ${response.status}: ${error.errors?.join(', ') || 'Erreur lors de l\'initiation de la vente'}`)
    }

    return response.json()
  }

  async initiateBuy({ operator, amount }) {
    const formattedOperator = operator === 'mtn' ? 'MTN' : 'Orange'

    const response = await fetch(`${API_URL}/buy/initiate`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        operator: formattedOperator,
        amount: Number(amount)
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Erreur initiateBuy:', {
        status: response.status,
        statusText: response.statusText,
        error,
        sentData: {
          operator: formattedOperator,
          amount: Number(amount)
        }
      })
      throw new Error(error.message || `Erreur ${response.status}: ${error.errors?.join(', ') || 'Erreur lors de l\'initiation de l\'achat'}`)
    }

    return response.json()
  }
}

export const apiService = new ApiService() 
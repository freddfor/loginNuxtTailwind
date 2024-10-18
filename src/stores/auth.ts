import { defineStore } from 'pinia'
import axios from 'axios'

interface User {
  username: string
  // Add other user properties as needed
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(username: string, password: string) {
      // Replace with your actual API endpoint
      const response = await axios.post('/api/login', { username, password })
      this.token = response.data.token
      this.user = response.data.user
      localStorage.setItem('token', this.token)
    },
    async register(username: string, password: string) {
      // Replace with your actual API endpoint
      await axios.post('/api/register', { username, password })
    },
    async resetPassword(username: string) {
      // Replace with your actual API endpoint
      await axios.post('/api/reset-password', { username })
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
  },
})
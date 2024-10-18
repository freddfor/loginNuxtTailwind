import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
  email: string
  role: string
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
    async login(email: string, password: string) {
      // In a real application, you would make an API call here
      // For this example, we'll use a mock login
      if (email === 'admin@example.com' && password === 'password') {
        this.user = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
        }
        this.token = 'mock_token'
        localStorage.setItem('token', this.token)
      } else {
        throw new Error('Invalid credentials')
      }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
    async checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        // In a real application, you would validate the token with your API
        this.token = token
        this.user = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
        }
      }
    },
  },
})
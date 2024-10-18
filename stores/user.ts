import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
  email: string
  role: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
  }),
  actions: {
    async fetchUsers() {
      // In a real application, you would make an API call here
      // For this example, we'll use mock data
      this.users = [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
        { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user' },
      ]
    },
    async fetchUser(id: string) {
      return this.users.find(user => user.id === id)
    },
    async createUser(user: Omit<User, 'id'>) {
      // In a real application, you would make an API call here
      const newUser = {
        ...user,
        id: String(this.users.length + 1),
      }
      this.users.push(newUser)
    },
    async updateUser(user: User) {
      const index = this.users.findIndex(u => u.id === user.id)
      if (index !== -1) {
        this.users[index] = user
      }
    },
    async deleteUser(id: string) {
      const index = this.users.findIndex(user => user.id === id)
      if (index !== -1) {
        this.users.splice(index, 1)
      }
    },
  },
})
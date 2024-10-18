<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Create User</h2>
    <form @submit.prevent="createUser">
      <div class="mb-4">
        <label for="name" class="block mb-2">Name</label>
        <input type="text" id="name" v-model="user.name" required class="input">
      </div>
      <div class="mb-4">
        <label for="email" class="block mb-2">Email</label>
        <input type="email" id="email" v-model="user.email" required class="input">
      </div>
      <div class="mb-4">
        <label for="password" class="block mb-2">Password</label>
        <input type="password" id="password" v-model="user.password" required class="input">
      </div>
      <div class="mb-4">
        <label for="role" class="block mb-2">Role</label>
        <select id="role" v-model="user.role" required class="input">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create User</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const user = ref({
  name: '',
  email: '',
  password: '',
  role: 'user'
})

const createUser = async () => {
  try {
    await userStore.createUser(user.value)
    navigateTo('/users')
  } catch (error) {
    console.error('Failed to create user:', error)
    // Handle error (e.g., show error message)
  }
}
</script>
<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Edit User</h2>
    <form @submit.prevent="updateUser">
      <div class="mb-4">
        <label for="name" class="block mb-2">Name</label>
        <input type="text" id="name" v-model="user.name" required class="input">
      </div>
      <div class="mb-4">
        <label for="email" class="block mb-2">Email</label>
        <input type="email" id="email" v-model="user.email" required class="input">
      </div>
      <div class="mb-4">
        <label for="role" class="block mb-2">Role</label>
        <select id="role" v-model="user.role" required class="input">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Update User</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'

const route = useRoute()
const userStore = useUserStore()

const user = ref({
  id: '',
  name: '',
  email: '',
  role: ''
})

onMounted(async () => {
  const userId = route.params.id
  const fetchedUser = await userStore.fetchUser(userId)
  if (fetchedUser) {
    user.value = { ...fetchedUser }
  } else {
    // Handle user not found
    navigateTo('/users')
  }
})

const updateUser = async () => {
  try {
    await userStore.updateUser(user.value)
    navigateTo('/users')
  } catch (error) {
    console.error('Failed to update user:', error)
    // Handle error (e.g., show error message)
  }
}
</script>
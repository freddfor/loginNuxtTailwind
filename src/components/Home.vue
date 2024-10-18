<template>
  <div class="home">
    <h1>Welcome to the Home Page</h1>
    <p v-if="authStore.isAuthenticated">
      You are logged in as {{ authStore.user?.username }}
      <button @click="logout">Logout</button>
    </p>
    <p v-else>
      Please <router-link to="/login">login</router-link> to access your account.
    </p>
    <UserList v-if="authStore.isAuthenticated" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import UserList from './UserList.vue'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
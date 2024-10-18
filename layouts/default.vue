<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <NuxtLink to="/" class="flex-shrink-0 flex items-center">
              User Management
            </NuxtLink>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink to="/" class="nav-link">Home</NuxtLink>
              <NuxtLink to="/users" class="nav-link">Users</NuxtLink>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <button v-if="isAuthenticated" @click="logout" class="btn btn-primary">Logout</button>
            <NuxtLink v-else to="/login" class="btn btn-primary">Login</NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)

const logout = () => {
  authStore.logout()
  navigateTo('/login')
}
</script>

<style scoped>
.nav-link {
  @apply inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium;
}
.nav-link.router-link-active {
  @apply border-indigo-500 text-gray-900;
}
.nav-link:not(.router-link-active) {
  @apply border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700;
}
</style>
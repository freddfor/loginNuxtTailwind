import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore()

  // Check authentication status on app start
  await authStore.checkAuth()

  // Add navigation guard
  nuxtApp.hook('page:start', () => {
    const route = useRoute()
    if (route.meta.requiresAuth && !authStore.isAuthenticated) {
      return navigateTo('/login')
    }
  })
})
<template>
  <div class="forgot-password">
    <h2>Forgot Password</h2>
    <form @submit.prevent="resetPassword">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <button type="submit">Reset Password</button>
    </form>
    <p>
      <router-link to="/login">Back to Login</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const authStore = useAuthStore()

const resetPassword = async () => {
  try {
    await authStore.resetPassword(username.value)
    alert('Password reset instructions have been sent to your email.')
  } catch (error) {
    console.error('Password reset failed:', error)
    // Handle password reset error (e.g., show error message)
  }
}
</script>

<style scoped>
.forgot-password {
  max-width: 300px;
  margin: 0 auto;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  width: 100%;
  padding: 5px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}
</style>
<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">User Management</h2>
    <NuxtLink to="/users/create" class="btn btn-primary mb-4">Create User</NuxtLink>
    
    <div class="mb-4 flex justify-between items-center">
      <input v-model="search" placeholder="Search users..." class="input max-w-xs" @input="filterUsers">
      <select v-model="perPage" class="input max-w-xs" @change="updatePagination">
        <option :value="5">5 per page</option>
        <option :value="10">10 per page</option>
        <option :value="20">20 per page</option>
      </select>
    </div>

    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th v-for="column in columns" :key="column.key" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sort(column.key)">
            {{ column.label }}
            <span v-if="sortKey === column.key">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td v-for="column in columns" :key="column.key" class="px-6 py-4 whitespace-nowrap">{{ user[column.key] }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <NuxtLink :to="`/users/${user.id}/edit`" class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</NuxtLink>
            <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-4 flex justify-between items-center">
      <div>
        Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredUsers.length }} entries
      </div>
      <div>
        <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-primary mr-2">Previous</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-primary">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
]

const search = ref('')
const sortKey = ref('id')
const sortOrder = ref('asc')
const currentPage = ref(1)
const perPage = ref(10)

const users = computed(() => userStore.users)

const filteredUsers = computed(() => {
  return users.value.filter(user => 
    Object.values(user).some(value => 
      value.toString().toLowerCase().includes(search.value.toLowerCase())
    )
  )
})

const sortedUsers = computed(() => {
  return [...filteredUsers.value].sort((a, b) => {
    if (a[sortKey.value] < b[sortKey.value]) return sortOrder.value === 'asc' ? -1 : 1
    if (a[sortKey.value] > b[sortKey.value]) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
})

const totalPages = computed(() => Math.ceil(sortedUsers.value.length / perPage.value))

const startIndex = computed(() => (currentPage.value - 1) * perPage.value)
const endIndex = computed(() => Math.min(startIndex.value + perPage.value, sortedUsers.value.length))

const paginatedUsers = computed(() => {
  return sortedUsers.value.slice(startIndex.value, endIndex.value)
})

const sort = (key) => {
  if (key === sortKey.value) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const filterUsers = () => {
  currentPage.value = 1
}

const updatePagination = () => {
  currentPage.value = 1
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const deleteUser = async (id) => {
  if (confirm('Are you sure you want to delete this user?')) {
    await userStore.deleteUser(id)
  }
}

onMounted(() => {
  userStore.fetchUsers()
})
</script>
<template>
  <div class="user-list">
    <h2>User List</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users = ref<User[]>([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User' },
  { id: 6, name: 'Eva Wilson', email: 'eva@example.com', role: 'User' },
  { id: 7, name: 'Frank Miller', email: 'frank@example.com', role: 'Admin' },
  { id: 8, name: 'Grace Lee', email: 'grace@example.com', role: 'User' },
  { id: 9, name: 'Henry Taylor', email: 'henry@example.com', role: 'Manager' },
  { id: 10, name: 'Ivy Clark', email: 'ivy@example.com', role: 'User' },
  { id: 11, name: 'Jack Robinson', email: 'jack@example.com', role: 'User' },
  { id: 12, name: 'Karen White', email: 'karen@example.com', role: 'Admin' },
  { id: 13, name: 'Liam Harris', email: 'liam@example.com', role: 'User' },
  { id: 14, name: 'Mia Turner', email: 'mia@example.com', role: 'User' },
  { id: 15, name: 'Noah Martin', email: 'noah@example.com', role: 'Manager' },
  { id: 16, name: 'Olivia Garcia', email: 'olivia@example.com', role: 'User' },
  { id: 17, name: 'Peter King', email: 'peter@example.com', role: 'User' },
  { id: 18, name: 'Quinn Adams', email: 'quinn@example.com', role: 'Admin' },
  { id: 19, name: 'Rachel Scott', email: 'rachel@example.com', role: 'User' },
  { id: 20, name: 'Samuel Baker', email: 'samuel@example.com', role: 'User' },
]);

const itemsPerPage = 5;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(users.value.length / itemsPerPage));

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return users.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<style scoped>
.user-list {
  max-width: 800px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}

button:disabled {
  background-color: #a0cfbb;
  cursor: not-allowed;
}
</style>
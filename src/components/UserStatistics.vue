<template>
    <div class="grid-item">
      <h2>📊 用户借阅统计</h2>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - 借阅 {{ user.borrowCount }} 本书
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const users = ref([]);
  
      onMounted(() => {
        axios.get('/api/user-statistics')
          .then(response => {
            users.value = response.data;
          })
          .catch(error => console.error("获取用户统计数据失败", error));
      });
  
      return { users };
    }
  };
  </script>
  
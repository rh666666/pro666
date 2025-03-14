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

  <style scoped>
  .grid-item {
    background: var(--card-bg);
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: fadeIn 1s ease-in-out;
    color: var(--text-dark);
  }

  h2 {
    font-size: 18px;
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 0.5em;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    background: #f9f9f9;
    margin: 5px 0;
    padding: 10px;
    border-radius: 4px;
    transition: background 0.3s ease;
    font-size: 14px;
    color: var(--success-color);
  }

  li:hover {
    background: #e9e9e9;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  </style>

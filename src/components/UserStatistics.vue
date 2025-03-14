<template>
    <div class="grid-item">
      <h2>📊 用户借阅统计</h2>
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>借阅量</th>
            <th>最后借阅</th>
            <th>会员等级</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.borrowCount }}</td>
            <td>{{ dayjs(user.lastBorrow).format('YYYY-MM-DD HH:mm') }}</td>
            <td :class="['member-level', user.memberLevel]">{{ user.memberLevel }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import dayjs from 'dayjs';
  
  export default {
    setup() {
      const users = ref([]);
  
      onMounted(() => {
        axios.get('/api/user-statistics')
          .then(response => {
            users.value = response.data.users.sort((a, b) => b.borrowCount - a.borrowCount);
          })
          .catch(error => console.error("获取用户统计数据失败", error));
      });
  
      return { users, dayjs };
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
  .user-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }

  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }

  .member-level {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
  }

  .member-level.普通 {
    background: #e8f5e9;
    color: #2e7d32;
  }

  .member-level.VIP {
    background: #fff3e0;
    color: #ef6c00;
  }

  .member-level.黄金 {
    background: #fff8e1;
    color: #f9a825;
  }
  </style>

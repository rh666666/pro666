<template>
    <div class="grid-item">
      <h2>🔔 系统通知</h2>
      <ul>
        <li v-for="(notification, index) in notifications" :key="index">
          {{ notification.message }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { ElMessage } from 'element-plus'
  import axios from 'axios';
  
  export default {
    setup() {
      const notifications = ref([]);
  
      onMounted(async () => {
        try {
          const { data } = await axios.get('/api/notifications')
          notifications.value = data.length ? data : [{ message: "暂无新通知" }]
        } catch (error) {
          ElMessage.error('通知加载失败')
        }
      })
  
      return { notifications };
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

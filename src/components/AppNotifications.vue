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
  import axios from 'axios';
  
  export default {
    setup() {
      const notifications = ref([]);
  
      onMounted(() => {
        axios.get('/api/notifications')
          .then(response => {
            notifications.value = response.data;
          })
          .catch(error => console.error("获取通知失败", error));
      });
  
      return { notifications };
    }
  };
  </script>

  <style scoped>
  .grid-item {
    background: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: fadeIn 1s ease-in-out;
  }
  
  h2 {
    font-size: 1.5em;
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

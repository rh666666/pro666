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
  
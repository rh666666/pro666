<template>
    <div class="grid-item">
      <h2>🏛 图书馆概况</h2>
      <p>📚 馆藏书籍总数: {{ stats.totalBooks }}</p>
      <p>📖 总借阅量: {{ stats.totalBorrows }}</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const stats = ref({ totalBooks: 0, totalBorrows: 0 });
  
      onMounted(() => {
        axios.get('/api/library-summary')
          .then(response => {
            stats.value = response.data;
          })
          .catch(error => console.error("获取图书馆数据失败", error));
      });
  
      return { stats };
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
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  </style>

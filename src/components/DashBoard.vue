<template>
  <div class="grid-item">
    <h2>📊 仪表盘</h2>
    <p>📚 总书籍数: <span class="stat">{{ stats.totalBooks }}</span></p>
    <p>👥 总用户数: <span class="stat">{{ stats.totalUsers }}</span></p>
    <p>📖 今日借阅: <span class="stat">{{ stats.todayBorrows }}</span></p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const stats = ref({ totalBooks: 0, totalUsers: 0, todayBorrows: 0 });

    onMounted(() => {
      axios.get('/mock/dashboard')
        .then(response => {
          stats.value = response.data;
        })
        .catch(error => console.error("获取仪表盘数据失败", error));
    });

    return { stats };
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

.stat {
  color: var(--danger-color);
  font-weight: bold;
  font-size: 24px;
}

h2 {
  font-size: 18px;
  font-weight: bold;
  color: var(--primary-color);
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

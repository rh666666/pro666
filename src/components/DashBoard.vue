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
      axios.get('/api/dashboard')
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
.stat {
  color: #ff6347;
  font-weight: bold;
}
</style>

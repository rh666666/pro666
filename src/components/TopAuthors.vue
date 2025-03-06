<template>
  <div class="grid-item">
    <h2>🏆 最受欢迎作者</h2>
    <ul>
      <li v-for="(author, index) in authors.slice(0, 3)" :key="index">
        <strong>{{ index + 1 }}. {{ author.name }}</strong> - 借阅 <span class="read-count">{{ author.totalReadCount }}</span> 次
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const authors = ref([]);

    onMounted(() => {
      axios.get('/api/top-authors')
        .then(response => {
          authors.value = response.data;
        })
        .catch(error => console.error("获取热门作者数据失败", error));
    });

    return { authors };
  }
};
</script>

<style scoped>
.read-count {
  color: #ff6347;
  font-weight: bold;
}
</style>

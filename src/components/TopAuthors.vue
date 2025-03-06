<template>
  <div class="grid-item">
    <h2>🏆 最受欢迎作者</h2>
    <ul>
      <li v-for="(author, index) in authors" :key="index">
        {{ index + 1 }}. {{ author.name }} - 借阅 {{ author.borrowCount }} 次
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

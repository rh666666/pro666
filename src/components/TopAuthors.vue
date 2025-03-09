<template>
  <div>
    <h2>🏆 最受欢迎作者</h2>
    <ul>
      <li v-for="(author, index) in authors.slice(0, 10)" :key="index">
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

h2 {
  font-size: 1.5em;
  margin-bottom: 0.5em;
  animation: fadeIn 1s ease-in-out;
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

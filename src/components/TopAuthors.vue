<template>
  <div>
    <h2>🏆 最受欢迎作者</h2>
    <ul>
      <li v-for="(author, index) in authors.slice(0, 20)" :key="index">
        <strong>{{ index + 1 }}. {{ author.name }}</strong>
        <span class="meta">
          × 
          <span class="count">{{ author.totalReadCount }}</span>
        </span>
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
          if(Array.isArray(response.data.authors)) {
          authors.value = response.data.authors;
        } else {
          console.error('接口返回数据格式错误：', response.data);
          authors.value = [];
        }
        })
        .catch(error => console.error("获取热门作者数据失败", error));
    });

    return { authors };
  }
};
</script>

<style scoped>
.read-count {
  color: var(--danger-color);
  font-weight: bold;
  font-size: 24px;
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

h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.5em;
  color: var(--primary-color);
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

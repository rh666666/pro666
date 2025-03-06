<template>
  <div class="grid-item">
    <h2>🔥 最受欢迎书籍</h2>
    <ul>
      <li v-for="(book, index) in books.slice(0, 3)" :key="index">
        <strong>{{ index + 1 }}. {{ book.title }}</strong> ({{ book.publishYear }}) - 借阅 <span class="read-count">{{ book.readCount }}</span> 次
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const books = ref([]);

    onMounted(() => {
      axios.get('/api/popular-books')
        .then(response => {
          books.value = response.data;
        })
        .catch(error => console.error("获取热门书籍数据失败", error));
    });

    return { books };
  }
};
</script>

<style scoped>
.read-count {
  color: #ff6347;
  font-weight: bold;
}
</style>

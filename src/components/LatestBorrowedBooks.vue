<template>
  <div>
    <h2>最新借阅图书</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        <strong>{{ book.title }}</strong> ({{ book.publishYear }}) by <em>{{ book.author }}</em> - 阅读量: <span class="read-count">{{ book.readCount }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'LatestBorrowedBooks',
  setup() {
    const books = ref([]);

    onMounted(() => {
      axios.get('/api/latest-borrowed-books')
        .then(response => {
          books.value = response.data;
        })
        .catch(error => console.error("获取最新借阅图书数据失败", error));
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
h2 {
  color: #2c3e50;
}
</style>

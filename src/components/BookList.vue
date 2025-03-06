<template>
  <div>
    <h2>📚 图书列表</h2>
    <ul>
      <li v-for="book in sortedBooks.slice(0, 10)" :key="book.id">
        <strong>{{ book.title }}</strong> ({{ book.publishYear }}) by <em>{{ book.author }}</em> - 阅读量: <span class="read-count">{{ book.readCount }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const books = ref([]);

    onMounted(() => {
      axios.get('/api/books') 
        .then(response => {
          // 确保数据结构正确
          if (response.data && response.data.books) {
            books.value = response.data.books;
          }
        })
        .catch(error => console.error("获取图书列表失败", error));
    });

    const sortedBooks = computed(() => {
      return books.value.sort((a, b) => a.id - b.id);
    });

    return { books, sortedBooks };
  }
};
</script>

<style scoped>
.read-count {
  color: #ff6347;
  font-weight: bold;
}
</style>
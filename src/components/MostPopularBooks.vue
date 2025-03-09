<template>
  <div>
    <h2>🔥 最受欢迎书籍</h2>
    <ul>
      <li v-for="(book, index) in books.slice(0, 10)" :key="index">
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

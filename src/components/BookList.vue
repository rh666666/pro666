<template>
  <div>
    <h2>图书列表</h2>
    <ul>
      <li v-for="book in books" :key="book.id">{{ book.title }} - {{ book.author }}</li>
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
      // 修改为模拟接口地址
      axios.get('/api/books') 
        .then(response => {
          // 根据 Mock.js 返回的数据结构调整
          books.value = response.data.books; 
        })
        .catch(error => console.error("获取图书列表失败", error));
    });

    return { books };
  }
};
</script>
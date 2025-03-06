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
        axios.get('http://localhost:5000/api/books')
          .then(response => {
            books.value = response.data;
          })
          .catch(error => console.error("获取图书列表失败", error));
      });
  
      return { books };
    }
  };
  </script>
  
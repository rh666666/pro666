<template>
    <div>
      <h2>最新借阅图书</h2>
      <ul>
        <li v-for="book in books" :key="book.id">{{ book.title }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LatestBorrowedBooks',
    data() {
      return {
        books: [
          { id: 1, title: "Vue 3 入门" },
          { id: 2, title: "JavaScript 高级程序设计" },
          { id: 3, title: "Python 数据分析" }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  h2 {
    color: #2c3e50;
  }
  </style>
  
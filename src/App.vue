<template>
  <div id="app" class="grid-container">
    <div class="grid-item"><LiveBorrow /></div>
    <div class="grid-item"><Dashboard /></div>
    <div class="grid-item"><BooksList /></div>
    <div class="grid-item"><TopAuthors /></div>
    <div class="grid-item"><MostPopularBooks /></div>
    <div class="grid-item"><AppNotifications /></div> <!-- 修改为 AppNotifications -->
    <div class="grid-item"><LatestBorrowedBooks /></div> <!-- 修改为 LatestBorrowedBooks -->
    <div class="grid-item"><UserStatistics /></div>
    <div class="grid-item"><LibrarySummary /></div>
  </div>
</template>

<script>
import LiveBorrow from './components/LiveBorrow.vue';
import Dashboard from './components/DashBoard.vue';  // 确保文件名正确
import BooksList from './components/BookList.vue';
import TopAuthors from './components/TopAuthors.vue';
import MostPopularBooks from './components/MostPopularBooks.vue';
import AppNotifications from './components/AppNotifications.vue';  // 修改为 AppNotifications

import LatestBorrowedBooks from './components/LatestBorrowedBooks.vue';  // 添加导入
import UserStatistics from './components/UserStatistics.vue';
import LibrarySummary from './components/LibrarySummary.vue';

export default {
  name: 'App',
  components: {
    LiveBorrow,
    Dashboard,
    BooksList,
    TopAuthors,
    MostPopularBooks,
    AppNotifications,  // 修改为 AppNotifications
    LatestBorrowedBooks,  // 添加组件
    UserStatistics,
    LibrarySummary
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

/* Grid layout for 3x3 structure */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 20px;
  min-height: 100vh; /* 避免溢出 */
  padding: 20px;
  overflow: auto;
}

/* Ensure each grid item has a consistent style */
.grid-item {
  padding: 10px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>

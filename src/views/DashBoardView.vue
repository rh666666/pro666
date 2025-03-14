<template>
  <div class="dashboard-container">
    <library-summary />
    <most-popular-books />
    <latest-borrow-books />
    <book-list />
    <el-row :gutter="20">
      <el-col :span="12">
        <top-authors />
      </el-col>
      <el-col :span="12">
        <user-statistics />
      </el-col>
    </el-row>
    <live-borrow />
  </div>
</template>

<script setup>
import { provide, ref, onBeforeUnmount } from 'vue';

import LibrarySummary from '@/components/LibrarySummary.vue';
import MostPopularBooks from '@/components/MostPopularBooks.vue';
import LatestBorrowedBooks from '@/components/LatestBorrowedBooks.vue';
import TopAuthors from '@/components/TopAuthors.vue';
import UserStatistics from '@/components/UserStatistics.vue';
import LiveBorrow from '@/components/LiveBorrow.vue';
import BookList from '@/components/BookList.vue';

const refreshFlag = ref(false);
provide('dashboardRefresh', refreshFlag);

const interval = setInterval(() => refreshFlag.value = !refreshFlag.value, 300000);
onBeforeUnmount(() => clearInterval(interval));
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 15px;
  padding: 0;
  margin: 0 -10px;
}

.grid-item:first-child {
  min-width: 100%;
  grid-column: 1 / 2;
  box-shadow: none;
  background-clip: padding-box;
}
</style>

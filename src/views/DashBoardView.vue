<template>
  <div class="dashboard-container">
    <library-summary />
    <most-popular-books />
    <latest-borrow-books />
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
import { provide, ref } from 'vue';
import { useAutoRefresh } from '../composables/useDashboard';
import LibrarySummary from '@/components/LibrarySummary.vue';
import MostPopularBooks from '@/components/MostPopularBooks.vue';
import LatestBorrowedBooks from '@/components/LatestBorrowedBooks.vue';
import TopAuthors from '@/components/TopAuthors.vue';
import UserStatistics from '@/components/UserStatistics.vue';
import LiveBorrow from '@/components/LiveBorrow.vue';

const refreshFlag = ref(false);
provide('dashboardRefresh', refreshFlag);

useAutoRefresh(300000, () => refreshFlag.value = !refreshFlag.value);
</script>

<style scoped>
.dashboard-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style>

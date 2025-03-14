import { ref, onMounted, onBeforeUnmount } from 'vue';
import { fetchPopularBooks, fetchLibraryStats } from '@/api/dashboard';

export const usePopularBooks = () => {
  const chartData = ref([]);

  onMounted(async () => {
    try {
      const { data } = await fetchPopularBooks();
      chartData.value = data.map(book => ({
        title: book.title,
        count: book.readCount
      }));
    } catch (error) {
      console.error('获取热门书籍数据失败', error);
    }
  });

  return { chartData };
};

export const useLibraryStats = () => {
  const stats = ref({ totalBooks: 0, totalBorrows: 0 });

  onMounted(async () => {
    try {
      const { data } = await fetchLibraryStats();
      stats.value = data;
    } catch (error) {
      console.error('获取图书馆数据失败', error);
    }
  });

  return { stats };
};

export const useAutoRefresh = (interval, callback) => {
  onMounted(() => {
    const timer = setInterval(callback, interval);
    onBeforeUnmount(() => clearInterval(timer));
  });
};

<template>
  <div class="grid-item">
    <h2 class="section-title">📚 图书借阅排行</h2>
    <ul class="list-container">
      <div ref="chart" class="chart-container"></div>
      <li
        v-for="(book, index) in books"
        :key="book.title"
        class="book-item"
      >
        <strong>{{ index + 1 }}. {{ book.title }}</strong> 
        <span class="meta">
          ({{ book.publishYear }}) × 
          <span class="count">{{ book.readCount }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import axios from 'axios';
import * as echarts from 'echarts';

const books = ref([]);
const chart = ref(null);
const chartInstance = ref(null);

onMounted(() => {
  axios.get('/api/popular-books')
    .then(response => {
      console.log('请求返回的数据:', response.data);
      books.value = response.data?.books || [];
    })
    .catch(error => console.error("获取热门书籍数据失败", error))
      .finally(() => {
        nextTick(() => {
          if (chart.value) {
            chartInstance.value = echarts.init(chart.value);
            const option = {
  title: {
    text: '📊 图书借阅排行',
    left: 'center'
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    data: books.value.map(b => b.title),
    axisLabel: {
      rotate: 45
    }
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    type: 'bar',
    data: books.value.map(b => b.readCount),
    itemStyle: {
      color: '#1890ff'
    }
  }]
};
            console.log('ECharts配置:', option);
            chartInstance.value.setOption(option);
          }
        });

onBeforeUnmount(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
});
      });

onBeforeUnmount(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
});
});

onBeforeUnmount(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
});
</script>

<style scoped>
.read-count {
  color: var(--danger-color);
  font-weight: bold;
  font-size: 24px;
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
  font-size: 14px;
  color: var(--success-color);
}

li:hover {
  background: #e9e9e9;
}

h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.5em;
  color: var(--primary-color);
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

.chart-container {
  height: 300px;
  margin-top: 20px;
  border-radius: 8px;
  background: var(--card-bg);
  padding: 15px;
}

.list-container {
  margin-bottom: 20px;
  min-height: 400px;
  overflow-y: auto;
}

.book-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  padding: 12px;
  background: var(--card-bg);
  border-radius: 8px;
  transition: transform 0.2s;
}

.ranking-badge {
  background: var(--primary-color);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  font-weight: 600;
}

.book-info {
  flex: 1;
}

.title {
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 4px;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author {
  font-size: 13px;
  color: var(--text-light);
}

.count {
  font-size: 12px;
  background: var(--primary-light);
  color: var(--primary-color);
  padding: 2px 8px;
  border-radius: 4px;
}

.read-count {
  color: var(--danger-color);
  font-weight: bold;
}
</style>

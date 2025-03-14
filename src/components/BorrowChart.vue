<template>
    <div ref="chart" class="chart-container"></div> <!-- 图表容器 -->
  </template>
  
  <script>
  import axios from 'axios';  // 导入 axios 库
  import * as echarts from 'echarts';  // 导入 ECharts
  import { ref, onMounted, onBeforeUnmount } from 'vue';

  export default {
    name: 'BorrowChart',
    setup() {
      const chartInstance = ref(null);
      const borrowData = ref([]);

      onMounted(() => {
        initChart();
        fetchData();
      });

      const initChart = () => {
        chartInstance.value = echarts.init(document.querySelector('.chart-container'));
      };

      const fetchData = async () => {
        try {
          const response = await axios.get('/api/borrow-stats');
          const data = response.data;
          updateChart(data);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };

      const updateChart = (data) => {
        const option = {
          title: {
            text: '借阅统计'
          },
          tooltip: {},
          xAxis: {
            data: data.books
          },
          yAxis: {},
          series: [{
            type: 'bar',
            data: data.borrowCount
          }]
        };
        chartInstance.value.setOption(option);
      };

      onBeforeUnmount(() => {
        if (chartInstance.value) {
          chartInstance.value.dispose();
        }
      });

      return { borrowData };
    }
  };
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    height: 400px;
    background: var(--card-bg);
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: fadeIn 1s ease-in-out;
    color: var(--text-dark);
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

<template>
    <div ref="chart" class="chart-container"></div> <!-- 图表容器 -->
  </template>
  
  <script>
  import axios from 'axios';  // 导入 axios 库
  import * as echarts from 'echarts';  // 导入 ECharts
  
  export default {
    name: 'BorrowChart',
    data() {
      return {
        chartInstance: null  // 用于存储 ECharts 实例
      };
    },
    mounted() {
      // 请求模拟数据
      axios.get('path/to/mockData.json')  // 这里的 'path/to/mockData.json' 是模拟数据的文件路径
        .then(response => {
          const data = response.data;
          this.updateChart(data);  // 调用方法更新图表数据
        })
        .catch(error => {
          console.error("Error fetching data", error);  // 捕获请求失败的错误
        });
    },
    methods: {
      updateChart(data) {
        // 设置图表配置项并更新
        const option = {
          title: {
            text: '借阅统计'  // 图表标题
          },
          tooltip: {},
          xAxis: {
            data: data.books  // 假设 data.books 存储了书籍名称
          },
          yAxis: {},
          series: [{
            type: 'bar',  // 使用柱状图
            data: data.borrowCount  // 假设 data.borrowCount 存储了对应书籍的借阅次数
          }]
        };
        this.chartInstance.setOption(option);  // 设置图表选项
      }
    }
  };
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    height: 400px;
  }
  </style>
  
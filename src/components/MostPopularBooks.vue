<template>
  <div class="grid-item">
    <h2 class="section-title">📚 图书借阅排行</h2>
    <div class="chart-container" ref="chartContainer">
      <echarts 
        :option="chartOption" 
        autoresize
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePopularBooks } from '../composables/useDashboard';
import * as echarts from 'echarts'; // 确保引入 echarts
import { onMounted, onBeforeUnmount, nextTick } from 'vue';

const { chartData } = usePopularBooks();

const chartOption = ref({
  dataset: { source: chartData },
  tooltip: {
    trigger: 'axis',
    formatter: '{b0}<br/>借阅量: {c0} 次'
  },
  xAxis: { type: 'value' },
  yAxis: {
    type: 'category',
    axisLabel: {
      formatter: value => value.substring(0, 6) + '...'
    }
  },
  series: [{
    type: 'bar',
    encode: { x: 'count', y: 'title' },
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: '#409EFF' },
        { offset: 1, color: '#67C23A' }
      ])
    }
  }]
});
const chartInstance = ref(null);
const chartContainer = ref(null);

onMounted(() => {
  nextTick(() => {
    chartInstance.value = echarts.init(chartContainer.value, null, {
      renderer: 'canvas'
    });
    chartInstance.value.setOption(chartOption.value);
  });
});

onBeforeUnmount(() => {
  if(chartInstance.value) {
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
</style>

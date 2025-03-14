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
  dataset: { 
    source: chartData.value.sort((a, b) => b.count - a.count).slice(0, 10),
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{b0}<br/>借阅量: {c0} 次',
    backgroundColor: 'rgba(245,245,245,0.98)',
    borderWidth: 0,
    textStyle: {
      color: '#2c3e50'
    }
  },
  xAxis: {
    type: 'value',
    splitLine: { show: false },
    axisLabel: { color: '#95a5a6' }
  },
  yAxis: {
    type: 'category',
    axisLabel: {
      color: '#2c3e50',
      fontSize: 12,
      formatter: (value) => value.length > 10 ? value.slice(0,8)+'...' : value
    },
    axisLine: { show: false },
    axisTick: { show: false }
  },
  grid: {
    left: '12%',
    right: '5%',
    containLabel: true
  },
  series: [{
    type: 'bar',
    barWidth: 14,
    itemStyle: {
      color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
        { offset: 0, color: '#3498db' },
        { offset: 1, color: '#2980b9' }
      ]),
      borderRadius: [0, 7, 7, 0]
    },
    label: {
      show: true,
      position: 'right',
      color: '#3498db',
      fontWeight: 'bold'
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

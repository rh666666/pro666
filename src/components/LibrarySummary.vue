<template>
  <div class="grid-item combined-stats">
    <div class="stat-block">
      <h3>馆藏总量</h3>
      <animated-number :value="stats.totalBooks" />
      <span class="compare">环比↑12%</span>
    </div>
    
    <div class="chart-wrapper">
      <echarts :option="usageChart" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLibraryStats } from '../composables/useDashboard';
import animatedNumber from 'vue-animated-number'; // 确保引入 animatedNumber

const { stats } = useLibraryStats();

const usageChart = ref({
  tooltip: { trigger: 'item' },
  series: [{
    type: 'pie',
    radius: ['60%', '80%'],
    data: [
      { value: 75, name: '在库书籍' },
      { value: 25, name: '借出书籍' }
    ],
    itemStyle: {
      borderRadius: 5,
      borderColor: '#fff',
      borderWidth: 2
    }
  }]
});
</script>

<style scoped>
.combined-stats {
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
}

.stat-block {
  text-align: center;
  h3 {
    color: var(--el-text-color-secondary);
    margin-bottom: 8px;
  }
}

.chart-wrapper {
  height: 180px;
}
</style>

<template>
  <div class="grid-item combined-stats">
    <div class="stat-grid">
      <div class="stat-card primary">
        <h3>📚 馆藏总量</h3>
        <number-animation :value="stats?.totalBooks" class="stat-number" />
        <div class="stat-details">
          <span class="compare">📈 月增 {{ stats?.monthGrowth }}%</span>
          <span class="compare">📅 年增 {{ stats?.yearGrowth }}%</span>
        </div>
      </div>

      <div class="stat-card success" v-for="cat in categoryStats" :key="cat.name">
        <h3>{{ cat.icon }} {{ cat.name }}</h3>
        <div class="stat-number">{{ cat.count }}</div>
        <div class="category-percent">{{ cat.percentage }}%</div>
      </div>
    </div>

    <div class="chart-wrapper">
      <div ref="chartContainer" style="height: 300px; margin-top: 20px"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import axios from 'axios';
import NumberAnimation from 'vue3-number-animation';
import * as echarts from 'echarts';

const stats = ref({});

const categoryStats = computed(() => {
  return stats.value.categories?.map(cat => ({
    ...cat,
    percentage: ((cat.count / stats.value.totalBooks) * 100).toFixed(1)
  })) || [];
});

const chartInstance = ref(null);
const chartContainer = ref(null);

const usageChart = ref({
  tooltip: { trigger: 'item' },
  series: [{
    type: 'pie',
    radius: ['60%', '80%'],
    data: categoryStats.value.map(item => ({
      name: item.name,
      value: item.count,
      itemStyle: { color: getCategoryColor(item.name) }
    })),
    itemStyle: {
      borderRadius: 5,
      borderColor: '#fff',
      borderWidth: 2
    }
  }]
});

const getCategoryColor = (name) => {
  const colors = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE'];
  return colors[stats.value.categories.findIndex(c => c.name === name)] || '#999';
};

onMounted(() => {
  chartInstance.value = echarts.init(chartContainer.value);
  // 初始化空图表
  chartInstance.value.setOption({
    tooltip: { trigger: 'item' },
    series: [{ type: 'pie', radius: ['60%', '80%'], data: [] }]
  });

  const fetchData = async () => {
    try {
      // 生成随机增长数据
      stats.value = {
        totalBooks: Math.floor(Math.random() * 50000) + 10000,
        monthGrowth: (Math.random() * 5 + 1).toFixed(1),
        yearGrowth: (Math.random() * 15 + 5).toFixed(1),
        categories: Array.from({length: 5}, (_, i) => ({
          name: ['文学', '科技', '历史', '艺术', '教育'][i],
          count: Math.floor(Math.random() * 10000) + 2000,
          icon: ['📖', '💻', '🕰️', '🎨', '📝'][i]
        }))
      };
      // 更新图表数据（添加空值校验）
      chartInstance.value?.setOption({
        series: [{
          data: categoryStats.value.map(item => ({
            name: item.name,
            value: item.count,
            itemStyle: { color: getCategoryColor(item.name) }
          }))
        }]
      });
    } catch (error) {
      console.error('获取数据失败', error);
    }
  };
  fetchData();
  const interval = setInterval(fetchData, 30000);
  onBeforeUnmount(() => {
    clearInterval(interval);
    chartInstance.value?.dispose();
  });
});

onBeforeUnmount(() => {
  if(chartInstance.value) {
    chartInstance.value.dispose();
  }
});
</script>

<style scoped>
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.stat-card {
  padding: 16px;
  border-radius: 8px;
  background: var(--el-bg-color);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.stat-card.primary {
  background: linear-gradient(135deg, #409EFF, #79BBFF);
  color: white;
}

.stat-card.success {
  background: rgba(103,194,58,0.1);
  border: 1px solid var(--el-color-success-light-5);
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  margin: 8px 0;
}

.category-percent {
  color: var(--el-color-success);
  font-size: 14px;
}

.chart-wrapper {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
</style>
import NumberAnimation from 'vue3-number-animation';

const categoryStats = computed(() => {
  return stats.value.categories?.map(cat => ({
    ...cat,
    percentage: ((cat.count / stats.value.totalBooks) * 100).toFixed(1)
  })) || [];
});

const initChart = () => {
  const option = {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
      axisLabel: { color: '#666' }
    },
    yAxis: { type: 'value' },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'line',
      smooth: true,
      areaStyle: {},
      lineStyle: { width: 3 },
      itemStyle: { color: '#409EFF' }
    }]
  };
  chartInstance.value.setOption(option);
};

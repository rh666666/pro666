<template>
  <div>
    <h2>📚 图书列表</h2>
    <ul>
      <li v-for="book in sortedBooks.slice(0, 10)" :key="book.id">
        <strong>{{ book.title }}</strong> ({{ book.publishYear }}) by
        <em>{{ book.author }}</em> - 阅读量: <span class="read-count">{{ book.readCount }}</span> - 出版社: <span class="publisher">{{ book.publisher }}</span>
        <span class="read-count">{{ book.readCount }}</span>
      </li>
    </ul>
    <div ref="chart" class="chart-container"></div>
    <!-- 图表容器 -->
  </div>
</template>

<script>
import { ref, onMounted, computed, nextTick, onBeforeUnmount } from "vue";
import axios from "axios";
import * as echarts from "echarts"; // 导入 ECharts
import "echarts-gl"; // 导入 ECharts GL 扩展

export default {
  setup() {
    const books = ref([]);
    const chartInstance = ref(null); // 用于存储 ECharts 实例

    // 将图表初始化移至数据获取后
    onMounted(() => {
      axios.get("/api/books").then((response) => {
        if (response.data?.books) {
          books.value = response.data.books;
          // 确保DOM更新后初始化
          nextTick(() => {
            chartInstance.value = echarts.init(
              document.querySelector(".chart-container")
            );
            updateChart();
          });
        }
      });
    });

    // 添加组件卸载时的清理
    onBeforeUnmount(() => {
      if (chartInstance.value) {
        chartInstance.value.dispose();
      }
    });

    const sortedBooks = computed(() => {
      return books.value.sort((a, b) => a.id - b.id);
    });

    const updateChart = () => {
      // 改用二维柱状图
      const option = {
        xAxis: {
          type: "category",
          data: books.value.map((book) => book.title.slice(0, 6) + "..."), // 截断长书名
        },
        yAxis: { type: "value" },
        series: [
          {
            type: "bar",
            data: books.value.map((book) => book.readCount),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#409EFF" },
                { offset: 1, color: "#67C23A" },
              ]),
            },
          },
        ],
      };
      chartInstance.value.setOption(option); // 设置图表选项
    };

    return { books, sortedBooks };
  },
};
</script>

<style scoped>
.read-count {
  color: var(--danger-color);
  font-weight: bold;
  font-size: 24px;
}
.publisher {
  color: var(--info-color);
  font-size: 12px;
}

.chart-container {
  width: 100%;
  height: 400px;
  margin-top: 20px;
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

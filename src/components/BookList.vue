<template>
  <div>
    <h2>📚 图书列表</h2>
    <ul>
      <li v-for="book in sortedBooks.slice(0, 10)" :key="book.id">
        <strong>{{ book.title }}</strong> ({{ book.publishYear }}) by <em>{{ book.author }}</em> - 阅读量: <span class="read-count">{{ book.readCount }}</span>
      </li>
    </ul>
    <div ref="chart" class="chart-container"></div> <!-- 图表容器 -->
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import * as echarts from 'echarts'; // 导入 ECharts
import 'echarts-gl'; // 导入 ECharts GL 扩展

export default {
  setup() {
    const books = ref([]);
    const chartInstance = ref(null); // 用于存储 ECharts 实例

    onMounted(() => {
      axios.get('/api/books') 
        .then(response => {
          // 确保数据结构正确
          if (response.data && response.data.books) {
            books.value = response.data.books;
            updateChart(); // 更新图表数据
          }
        })
        .catch(error => console.error("获取图书列表失败", error));

      // 初始化图表
      chartInstance.value = echarts.init(document.querySelector('.chart-container'));
    });

    const sortedBooks = computed(() => {
      return books.value.sort((a, b) => a.id - b.id);
    });

    const updateChart = () => {
      const option = {
        title: {
          text: '图书阅读量统计' // 图表标题
        },
        tooltip: {},
        xAxis3D: {
          type: 'category',
          data: books.value.map(book => book.title) // 使用书籍名称作为 X 轴数据
        },
        yAxis3D: {
          type: 'category',
          data: books.value.map(book => book.author) // 使用作者名称作为 Y 轴数据
        },
        zAxis3D: {
          type: 'value'
        },
        grid3D: {
          boxWidth: 200,
          boxDepth: 80,
          viewControl: {
            // 控制视角
            projection: 'orthographic'
          },
          light: {
            main: {
              intensity: 1.2
            },
            ambient: {
              intensity: 0.3
            }
          }
        },
        series: [{
          type: 'bar3D',
          data: books.value.map(book => [book.title, book.author, book.readCount]), // 使用书籍名称、作者名称和阅读量作为数据
          shading: 'lambert',
          label: {
            show: false
          },
          emphasis: {
            label: {
              fontSize: 16,
              color: '#900'
            },
            itemStyle: {
              color: '#900'
            }
          }
        }]
      };
      chartInstance.value.setOption(option); // 设置图表选项
    };

    return { books, sortedBooks };
  }
};
</script>

<style scoped>
.read-count {
  color: #ff6347;
  font-weight: bold;
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
}

li:hover {
  background: #e9e9e9;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 0.5em;
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
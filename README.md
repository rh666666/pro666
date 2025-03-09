<div align="center">
  en | <a href="docs/README_zh-CN.md">中文</a>
</div>

# Book Management System

## 1. Introduction
The Book Management System is a web - based application designed to manage book - related information. It provides users with an intuitive interface to view book lists, popular books, popular authors, and recent borrows. Additionally, it offers a dashboard to display overall statistics.

## 2. Features
### 2.1 Book List
- Displays basic information about all books, including title, author, publication year, and read count.
- Lists the top 10 books sorted by their ID.

### 2.2 Most Popular Books
Shows the books with the highest read count.

### 2.3 Most Popular Authors
Displays the authors with the highest total read count of their books.

### 2.4 Latest Borrowed Books
Shows the most recently borrowed books.

### 2.5 Dashboard
Displays the total number of books, total number of users, and today's borrow count.

## 3. Directory Structure
```
.
├── src
│   ├── components
│   │   ├── BookList.vue
│   │   ├── MostPopularBooks.vue
│   │   ├── TopAuthors.vue
│   │   ├── LatestBorrowedBooks.vue
│   │   └── DashBoard.vue
│   └── mock
│       └── mock.js
└── README.md
```
- **`src/components`**: Contains Vue components for different features of the application.
- **`src/mock`**: Holds mock data and related scripts for development and testing.

## 4. Installation and Running
### 4.1 Prerequisites
- Node.js (version >= 10 recommended)
- npm (usually comes with Node.js installation)

### 4.2 Steps
1. **Clone the project to your local machine**:
```bash
git clone https://github.com/rh666666/pro666
cd pro666
```
2. **Install dependencies**:
```bash
npm install
```
3. **Run the project**:
```bash
npm run serve
```
After the project starts successfully, you can access the application in your browser at `http://localhost:8080` (the port number may vary according to your configuration).

## 5. Technologies Used
### 5.1 Front - end
- **Vue 3**: A progressive JavaScript framework for building user interfaces.
- **Axios**: A promise - based HTTP client for the browser and Node.js, used for making API requests.
- **Mock.js**: A library for generating mock data, facilitating front - end development and testing.

### 5.2 Back - end
Currently, the `server` directory is reserved for future back - end development. It is not in use at present.

## 6. Code Example: BookList.vue
The `BookList.vue` component is responsible for displaying the book list. Here is its code:
```vue
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
```
### Explanation
- **Template**: Displays the book list in an unordered list. It shows the book title, publication year, author, and read count.
- **Script**:
  - Uses Vue 3's Composition API.
  - Fetches book data from the `/api/books` API when the component is mounted.
  - Sorts the books by their ID using a computed property.
- **Style**: Sets the color and font - weight of the read count.

## 7. Contribution
We welcome contributions from the community! If you want to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Write your code and ensure all tests pass.
4. Submit a pull request.

## 8. License
This project is licensed under the MIT License. You can find the full text of the license in the `LICENSE` file (if available) or at [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT).

## 9. Contact
If you have any questions or suggestions about this project, please feel free to open an issue on the GitHub repository.
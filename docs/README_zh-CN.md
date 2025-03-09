# 图书管理系统项目文档

## 一、项目概述
本项目是一个图书管理系统，旨在为用户提供便捷的图书信息管理和查询功能。它具备以下核心功能：
1. **图书列表**：展示所有图书的详细信息，包括书名、作者、出版年份以及阅读量。
2. **最受欢迎书籍**：呈现阅读量最高的书籍，方便用户快速找到热门读物。
3. **最受欢迎作者**：显示总阅读量最高的作者，帮助用户了解受欢迎的作家。
4. **最新借阅图书**：展示最新被借阅的图书，让用户及时了解借阅动态。
5. **仪表盘**：提供总书籍数、总用户数和今日借阅数等关键数据的统计展示。

## 二、目录结构
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
├── public
│   ├── favicon.ico
│   └── index.html
├── server
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── docs
│   └── README_zh-CN.md
├── .gitignore
├── LICENSE
├── README.md
├── babel.config.js
├── jsconfig.json
├── package-lock.json
├── package.json
└── vue.config.js
```
- `src/components`：存放项目的各个组件，每个组件负责不同的功能模块。
- `src/mock`：包含模拟数据的文件，用于开发和测试阶段。
- `public`：存放公共资源，如网站图标和入口 HTML 文件。
- `server`：目前该目录保留作为未来添加后端功能的参考，暂不用于开发。
- `docs`：包含项目的中文文档。

## 三、安装与运行
### （一）环境要求
确保你已经安装了 Node.js 和 npm。

### （二）步骤
1. **克隆项目到本地**：
```bash
git clone https://github.com/rh666666/pro666
cd pro666
```
2. **安装依赖**：
```bash
npm install
```
3. **运行项目**：
```bash
npm run serve
```
项目启动成功后，你可以在浏览器中访问 `http://localhost:8080` 来查看应用。

## 四、使用技术
### （一）前端技术
1. **Vue 3**：用于构建用户界面，提供响应式和组件化的开发体验。
2. **Axios**：用于处理 HTTP 请求，与后端进行数据交互。
3. **Mock.js**：用于生成模拟数据，方便前端开发和测试。

### （二）后端技术
目前 `server` 目录预留，尚未投入使用，后续可在此处添加后端功能。

## 五、代码示例：BookList.vue
`BookList.vue` 组件负责展示图书列表，以下是其详细代码及解释：
```vue
<template>
  <div>
    <h2>📚 图书列表</h2>
    <ul>
      <li v-for="book in sortedBooks.slice(0, 10)" :key="book.id">
        <strong>{{ book.title }}</strong> ({{ book.publishYear }}) by <em>{{ book.author }}</em> - 阅读量: <span class="read-count">{{ book.readCount }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const books = ref([]);

    onMounted(() => {
      axios.get('/api/books') 
        .then(response => {
          // 确保数据结构正确
          if (response.data && response.data.books) {
            books.value = response.data.books;
          }
        })
        .catch(error => console.error("获取图书列表失败", error));
    });

    const sortedBooks = computed(() => {
      return books.value.sort((a, b) => a.id - b.id);
    });

    return { books, sortedBooks };
  }
};
</script>

<style scoped>
.read-count {
  color: #ff6347;
  font-weight: bold;
}
</style>
```
### （一）模板部分
使用 `<template>` 标签定义组件的 HTML 结构，通过 `v-for` 指令遍历 `sortedBooks` 数组，展示前 10 本图书的信息，包括书名、出版年份、作者和阅读量。

### （二）脚本部分
使用 Vue 3 的组合式 API，在 `setup` 函数中完成以下操作：
1. 定义 `books` 响应式变量，用于存储图书数据。
2. 在 `onMounted` 钩子中，使用 `axios` 发送 GET 请求获取图书列表数据，并将其赋值给 `books`。
3. 使用 `computed` 函数定义 `sortedBooks`，对图书数据按 `id` 进行排序。

### （三）样式部分
使用 `<style scoped>` 标签定义局部样式，将阅读量的文本颜色设置为 `#ff6347`，并加粗显示。

## 六、贡献
欢迎大家为项目贡献代码和提交问题！如果你想参与项目开发，请遵循以下步骤：
1. Fork 本仓库。
2. 创建一个新的分支用于开发新功能或修复 bug。
3. 编写代码并确保所有测试通过。
4. 提交 Pull Request。

## 七、许可证
本项目采用 MIT 许可证，你可以在 `LICENSE` 文件中查看完整的许可证信息。

## 八、联系我们
如果你对项目有任何疑问或建议，请在 GitHub 仓库中提交 Issue。 
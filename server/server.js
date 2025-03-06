const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const books = [
  { id: 1, title: "Vue 3 入门", author: "张三", category: "前端" },
  { id: 2, title: "JavaScript 高级程序设计", author: "李四", category: "编程" },
  { id: 3, title: "Python 数据分析", author: "王五", category: "数据科学" }
];

// 获取所有图书
app.get('/api/books', (req, res) => {
  res.json(books);
});

// 添加新书
app.post('/api/books', (req, res) => {
  const newBook = req.body;
  books.push({ id: books.length + 1, ...newBook });
  res.json({ message: "书籍已添加", book: newBook });
});

// 启动服务器
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`📚 后端服务器运行在 http://localhost:${PORT}`);
});

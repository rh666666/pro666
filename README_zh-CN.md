<div align="center">
  <a href="./README.md">English</a> | 中文
</div>

# 项目简介

本项目是一个图书管理系统，包含以下主要功能：

- 图书列表：显示所有图书的信息，包括书名、作者、出版年份和阅读量。
- 最受欢迎书籍：显示阅读量最高的书籍。
- 最受欢迎作者：显示总阅读量最高的作者。
- 最新借阅图书：显示最新被借阅的图书。
- 仪表盘：显示总书籍数、总用户数和今日借阅数。

## 目录结构

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
└── README_zh_CN.md
```

## 安装与运行

1. 克隆项目到本地：
   ```bash
   git clone <项目地址>
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 运行项目：
   ```bash
   npm run serve
   ```

## 使用技术

- Vue 3
- Axios
- Mock.js

## 贡献

欢迎提交问题和贡献代码！请确保在提交之前运行所有测试并通过。

## 许可证

本项目采用 MIT 许可证。

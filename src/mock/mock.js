// src/mock/mock.js
import Mock from 'mockjs';

// 模拟总用户数
const totalUsers = Mock.mock('@natural(1000, 5000)');

// 生成图书数据
const booksData = Mock.mock({
  "books|10000-50000": [
    {
      "id|+1": 1,
      "title": "@ctitle(5, 10)",
      "author": "@cname",
      "publishYear|1900-2023": 1,
      "readCount": () => Math.max(Math.floor(Math.random() * totalUsers * 3) - Math.round(0.2 * totalUsers), 0)
    }
  ]
}).books;

// 模拟仪表盘数据接口
Mock.mock('/api/dashboard', 'get', () => {
  const totalBooks = booksData.length;
  const todayBorrows = Mock.mock('@natural(100, 500)');
  return { totalBooks, totalUsers, todayBorrows };
});

// 确保最新借阅的图书的阅读量不为0
booksData.forEach(book => {
  if (book.readCount === 0) {
    book.readCount = Math.floor(Math.random() * totalUsers) + 1;
  }
});

// 模拟图书数据接口
Mock.mock('/api/books', 'get', () => {
  return { books: booksData };
});

// 模拟热门书籍接口
Mock.mock('/api/popular-books', 'get', () => {
  const popularBooks = booksData
    .sort((a, b) => b.readCount - a.readCount)
    .slice(0, 3);
  return popularBooks;
});

// 模拟热门作者接口
Mock.mock('/api/top-authors', 'get', () => {
  const authorMap = {};
  booksData.forEach(book => {
    if (!authorMap[book.author]) {
      authorMap[book.author] = { name: book.author, totalReadCount: 0 };
    }
    authorMap[book.author].totalReadCount += book.readCount;
  });
  const topAuthors = Object.values(authorMap)
    .sort((a, b) => b.totalReadCount - a.totalReadCount)
    .slice(0, 3);
  return topAuthors;
});

// 模拟最新借阅图书接口
Mock.mock('/api/latest-borrowed-books', 'get', () => {
  const latestBorrowedBooks = booksData
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
  return latestBorrowedBooks;
});
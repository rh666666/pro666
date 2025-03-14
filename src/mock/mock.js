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
      "publisher": "@cword(3,5)出版社",
      "publishYear|1900-2023": 1,
      "readCount": () => Math.floor(Math.random() * totalUsers * 3) + 1
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
    .slice(0, 10); // 返回10个结果
  return { books: popularBooks };
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
    .slice(0, 20); // 返回20个结果
  return { authors: topAuthors };
});

// 模拟最新借阅图书接口
Mock.mock('/api/latest-borrowed-books', 'get', () => {
  const latestBorrowedBooks = booksData
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
  return { books: latestBorrowedBooks };
});

// 模拟实时借阅信息接口
Mock.mock('/api/live-borrow', 'get', () => {
  let transactionId = 0;
  const now = new Date();
  
  return {
    data: booksData.slice(0, 10).map(book => ({
      id: transactionId++,
      timestamp: Date.now() - 86400000 + Math.floor(Math.random() * 86400000),
      type: Mock.mock('@pick(["借阅", "归还"])'),
      content: Mock.mock(`@cname`) + Mock.mock(`@pick(["借阅了", "归还了"])`) + `《${book.title}》`
    }))
  };
});

// 模拟图书馆概要接口
Mock.mock('/api/library-summary', 'get', () => ({
  totalBooks: booksData.length,
  totalUsers,
  monthlyGrowth: Mock.mock('@float(0.5, 15, 1, 2)'),
  activeUsers: Mock.mock('@natural(500, 2000)')
}));

// 模拟用户统计接口
Mock.mock('/api/user-statistics', 'get', () => {
  const users = Array.from({length: 30}, (_, i) => ({
    id: i + 1,
    name: Mock.mock('@cname'),
    borrowCount: Mock.mock('@natural(50, 200)'),
    lastBorrow: new Date(Date.now() - Math.floor(Math.random() * 604800000)).toISOString(), // 最近7天内的随机时间
    memberLevel: Mock.mock('@pick(["普通", "VIP", "黄金"])')
  })).sort((a, b) => b.borrowCount - a.borrowCount);
  return { users };
});
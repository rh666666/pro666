import Mock from 'mockjs';

Mock.setup({
  timeout: '200-600'
});

Mock.mock('/api/dashboard', 'get', {
  totalBooks: '@integer(1000, 5000)',
  totalUsers: '@integer(100, 1000)',
  todayBorrows: '@integer(10, 100)'
});

Mock.mock('/api/library-summary', 'get', {
  totalBooks: '@integer(1000, 5000)',
  totalBorrows: '@integer(10000, 50000)'
});

Mock.mock('/api/latest-borrowed-books', 'get', {
  'books|5-10': [{
    id: '@guid',
    title: '@title',
    publishYear: '@date("yyyy")',
    author: '@name',
    readCount: '@integer(100, 1000)'
  }]
});

Mock.mock('/api/popular-books', 'get', {
  'books|5-10': [{
    id: '@guid',
    title: '@title',
    publishYear: '@date("yyyy")',
    readCount: '@integer(1000, 10000)'
  }]
});

Mock.mock('/api/top-authors', 'get', {
  'authors|5-10': [{
    id: '@guid',
    name: '@name',
    totalReadCount: '@integer(1000, 10000)'
  }]
});

Mock.mock('/api/user-statistics', 'get', {
  'users|5-10': [{
    id: '@guid',
    name: '@name',
    borrowCount: '@integer(10, 100)'
  }]
});

Mock.mock('/api/notifications', 'get', {
  'notifications|1-5': [{
    id: '@guid',
    message: '@sentence'
  }]
});

Mock.mock('/api/books', 'get', {
  'books|10-20': [{
    id: '@guid',
    title: '@title',
    publishYear: '@date("yyyy")',
    author: '@name',
    readCount: '@integer(100, 1000)'
  }]
});

Mock.mock('/api/borrow-stats', 'get', {
  'books|10': ['@title'],
  'borrowCount|10': ['@integer(100, 1000)']
});

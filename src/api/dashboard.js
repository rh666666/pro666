import { getDashboardData } from '../mock/dashboard.js';
import Mock from 'mockjs';

const fetchPopularBooks = () => {
  return new Promise((resolve) => {
    const popularBooks = Mock.mock({
      'books|5-10': [
        {
          'title': '@ctitle(8, 15)',
          'readCount|1-100': 1
        }
      ]
    });
    resolve({ data: popularBooks.books });
  });
};

const fetchLibraryStats = () => {
  return new Promise((resolve) => {
    const stats = Mock.mock({
      totalBooks: '@natural(1000, 5000)',
      totalBorrows: '@natural(100, 500)' 
    });
    resolve({ data: stats });
  });
};

export { getDashboardData, fetchPopularBooks, fetchLibraryStats };
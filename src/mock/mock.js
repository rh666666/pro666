// src/mock/mock.js
import Mock from 'mockjs';

// 模拟图书数据
Mock.mock('/api/books', 'get', (req, res) => {
    console.log('Mock.js 拦截了请求！');
    return {
      "books|5-10": [
        {
          "id|+1": 1,
          "title": "@ctitle(5, 10)",
          "author": "@cname",
          "category": "@word(3, 5)"
        }
      ]
    };
  });
  

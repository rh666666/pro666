import Mock from 'mockjs';

export const getDashboardData = () => Mock.mock({
  'mostPopularBooks|5-10': [{
    'title': '@ctitle(8, 15)',
    'count|1-100': 1
  }],
  'topAuthors|5-10': [{
    'name': '@cname',
    'totalReadCount|1-200': 1
  }]
});

const mockRealtimeData = () => [
  {
    id: 1,
    time: '2024-01-01 10:00',
    type: '借阅',
    content: '用户A借阅了《书籍1》'
  },
  {
    id: 2,
    time: '2024-01-01 10:10',
    type: '归还',
    content: '用户B归还了《书籍2》'
  }
];

// 删除重复导出的 getDashboardData
// export { getDashboardData, mockRealtimeData };
export { mockRealtimeData };
# 图书管理系统

## 项目简介
可视化图书数据管理平台，提供实时借阅监控、阅读趋势分析、用户行为统计等功能，支持大规模模拟数据展示。

## 技术栈
- **前端框架**: Vue3 + Vite
- **UI组件库**: ElementPlus
- **数据模拟**: MockJS
- **图表库**: ECharts
- **路由管理**: Vue Router

## 核心功能模块
### 📊 数据仪表盘
- 实时显示总书籍数、用户数、当日借阅量
- 集成在`DashBoard.vue`组件

### 📈 统计图表
- 借阅趋势折线图（`BorrowChart.vue`）
- 热门书籍排行榜（`MostPopularBooks.vue`）
- 用户活跃度分布（`UserStatistics.vue`）

### 🚨 实时监控
- 最新借阅记录（`LatestBorrowedBooks.vue`）
- 实时借阅推送（`LiveBorrow.vue`）

### 📚 数据管理
- 图书目录浏览（`BookList.vue`）
- 作者排行榜（`TopAuthors.vue`）

## 安装运行
```bash
# 安装依赖
npm install

# 开发模式
npm run serve

# 生产构建
npm run build
```

## Mock接口文档
### 基础数据
- `GET /api/dashboard` 获取仪表盘统计数据
- `GET /api/books` 获取全部图书列表

### 实时数据
- `GET /api/live-borrow` 实时借阅信息流
- `GET /api/latest-borrowed-books` 最新10条借阅记录

### 统计接口
- `GET /api/popular-books` 热门书籍TOP10
- `GET /api/top-authors` 作者排行榜TOP20

### 扩展接口
- `GET /api/library-summary` 图书馆概要
- `GET /api/user-statistics` 用户活跃度统计

## 项目结构
```
src/
├── components/    # 可视化组件
├── mock/         # Mock数据服务
├── router/       # 路由配置
├── utils/        # 图表配置工具
└── views/        # 页面视图
```
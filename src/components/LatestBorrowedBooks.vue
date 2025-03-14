<template>
  <div class="grid-item">
    <h2 class="section-title">📅 最新借阅动态</h2>
    <el-scrollbar height="380px">
      <el-timeline>
        <el-timeline-item
          v-for="(record, index) in borrowRecords"
          :key="index"
          :timestamp="record.time"
          placement="top"
        >
          <el-tag effect="dark" type="success">NEW</el-tag>
          {{ record.user }} 于 {{ record.borrowTime }} 借阅了《{{ record.book }}》，应于 {{ record.returnTime }} 归还
        </el-timeline-item>
      </el-timeline>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { fetchLatestBorrows } from "@/mock/mock";
import dayjs from "dayjs"; // 确保引入 dayjs

const borrowRecords = ref([]);

const loadData = async () => {
  try {
    const { data } = await axios.get('/mock/latest-borrows');
    borrowRecords.value = data.map((item) => ({
      ...item,
      time: dayjs(item.timestamp).format("YYYY-MM-DD HH:mm"),
    }));
  } catch (error) {
    ElMessage.error("数据加载失败");
  }
};

loadData();
setInterval(loadData, 30000); // 30秒自动刷新
</script>

<style scoped>
.read-count {
  color: var(--danger-color);
  font-weight: bold;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 0.5em;
  animation: fadeIn 1s ease-in-out;
  color: var(--primary-color);
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #f9f9f9;
  margin: 5px 0;
  padding: 10px;
  border-radius: 4px;
  transition: background 0.3s ease;
  color: var(--text-dark);
}

li:hover {
  background: #e9e9e9;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.borrow-time {
  color: var(--info-color);
  font-size: 12px;
}
.return-time {
  color: var(--warning-color);
  font-size: 12px;
}
</style>

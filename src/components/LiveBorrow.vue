<template>
  <div class="grid-item">
    <h2 class="section-title">⚡ 实时借阅看板</h2>
    <div class="real-time-container">
      <transition-group name="flip-list" tag="ul">
        <li 
          v-for="item in realtimeData" 
          :key="item.id"
          class="real-time-item"
        >
          <span class="time">{{ item.time }}</span>
          <el-tag size="small">{{ item.type }}</el-tag>
          <span class="content">{{ item.content }}</span>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import dayjs from 'dayjs'

const realtimeData = ref([])

onMounted(() => {
  axios.get('/api/live-borrow')
    .then(response => {
      realtimeData.value = (response.data?.data || [])
        .map(item => ({
          ...item,
          timestamp: item.timestamp,
          time: dayjs(item.timestamp).format('YYYY-MM-DD HH:mm')
        }))
        .sort((a, b) => b.timestamp - a.timestamp);
    })
    .catch(error => console.error('获取实时数据失败', error));
})
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.8s ease;
}
.real-time-container {
  max-width: 100%;
  overflow: hidden;
}

.real-time-item {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  padding: 12px 16px;
  margin: 6px 0;
  background: rgba(64,158,255,0.05);
  border-radius: 6px;
  min-width: 320px;
}

.real-time-item .time {
  min-width: 90px;
}

.real-time-item .content {
  flex: 1;
  min-width: 200px;
}
</style>

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
import { mockRealtimeData } from '../mock/dashboard.js';

const realtimeData = ref([])

onMounted(() => {
  realtimeData.value = mockRealtimeData()
})
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.8s ease;
}
.real-time-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin: 4px 0;
  background: rgba(64,158,255,0.05);
  border-radius: 4px;
  transition: all 0.3s;
}
</style>

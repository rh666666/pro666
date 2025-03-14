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
import { ref, onBeforeUnmount } from 'vue'

const realtimeData = ref([])
let socket = null

const initWebSocket = () => {
  socket = new WebSocket('wss://your-websocket-endpoint')

  socket.onmessage = ({ data }) => {
    const msg = JSON.parse(data)
    realtimeData.value.unshift({
      id: Date.now(),
      time: dayjs().format('HH:mm:ss'),
      ...msg
    })
    
    // 保持最多20条记录
    if(realtimeData.value.length > 20) {
      realtimeData.value.pop()
    }
  }
}

onMounted(initWebSocket)
onBeforeUnmount(() => socket?.close())
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

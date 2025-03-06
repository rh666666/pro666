<template>
  <div class="grid-item">
    <h2>📖 实时借阅</h2>
    <ul>
      <li v-for="(book, index) in borrowedBooks" :key="index">
        {{ book }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const borrowedBooks = ref([]);

    onMounted(() => {
      const socket = new WebSocket("ws://localhost:5000/ws"); // 连接 WebSocket
      socket.onmessage = (event) => {
        borrowedBooks.value.push(event.data); // 新增借阅书籍
      };
    });

    return { borrowedBooks };
  }
};
</script>

<style scoped>
.grid-item {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>

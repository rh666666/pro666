<template>
    <div class="grid">
      <ECharts v-for="(option, index) in charts" :key="index" :option="option" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import ECharts from "vue-echarts";
  
  const charts = ref([]);
  
  onMounted(async () => {
    const { data } = await axios.get("http://localhost:5000/books");
    charts.value = [
      { title: { text: "热门书籍" }, series: [{ data: data.map(b => b.borrow_count) }] },
    ];
  });
  </script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style>

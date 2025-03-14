import { createRouter, createWebHistory } from 'vue-router';
import DashBoardView from '../views/DashBoardView.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashBoardView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainWindow',
      component: () => import('../components/MainWindow/MainWindow.vue')
    },
    {
      path: '/ScenicSpot',
      name: 'ScenicSpot',
      component: () => import('../views/Home.vue')
    },
  ]
})

export default router

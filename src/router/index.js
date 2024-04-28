import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainWindow',
      // component: () => import('../components/MainWindow/BarCharts.vue')
      component: () => import('../components/MainWindow/MainWindow.vue')
    },
    {
      path: '/SpotsMsg',
      name: 'SpotsMsg',
      component: () => import('../views/SpotsMsg.vue')
    },
  ]
})

export default router

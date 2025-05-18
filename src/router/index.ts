import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CameraControlsView from '../views/CameraControlsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/camera-controls',
    name: 'camera-controls',
    component: CameraControlsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
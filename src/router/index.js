import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Shop from "@/views/Shop";
import LeaderBoards from "@/views/LeaderBoards";
import Arena from "@/views/Arena";
import Inventory from "@/views/Inventory";
import Register from "@/views/Register";
import LogIn from "@/views/LogIn";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: Inventory
  },
  {
    path: '/arena',
    name: 'Arena',
    component: Arena
  },
  {
    path: '/leader-boards',
    name: 'LeaderBoards',
    component: LeaderBoards
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: LogIn
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

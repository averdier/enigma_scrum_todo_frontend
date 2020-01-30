import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Start = () => import('../views/main/Start.vue')
const Main = () => import('../views/main/Main.vue')
const TodoList = () => import('../views/todo/Index.vue')

const routes = [
  {
    path: '/',
    name: 'index',
    component: Start,
    children: [
      {
        path: 'main',
        name: 'main',
        component: Main,
        children: [
          {
            path: 'todo',
            name: 'todo',
            component: TodoList
          }
        ]
      }
    ]
  },
  {
    path: '*',
    name: 'fallback',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

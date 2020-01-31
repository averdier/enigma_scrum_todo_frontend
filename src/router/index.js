import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Start = () => import('../views/main/Start.vue')
const Main = () => import('../views/main/Main.vue')
const TodoList = () => import('../views/todo/Index.vue')

const Login = () => import('../views/main/Login.vue')
const LoginCallback = () => import('../views/oidc/Login.vue')
const LogoutCallback = () => import('../views/oidc/Logout.vue')

const routes = [
  {
    path: '/',
    name: 'index',
    component: Start,
    children: [
      {
        path: 'main',
        name: 'main-page',
        component: Main,
        children: [
          {
            path: 'todo',
            name: 'todo-page',
            component: TodoList
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login-page',
    component: Login
  },
  {
    path: '/oidc/login',
    name: 'login-callback',
    component: LoginCallback
  },
  {
    path: '/oidc/logout',
    name: 'logout-page',
    component: LogoutCallback
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

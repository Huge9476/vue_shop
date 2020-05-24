import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home'
import Welcome from '../components/Welcome'
import Users from '../components/user/Users';

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children:
      [
        { path: '/welcome', component: Welcome },
        { path: '/user/account', component: Users }
      ]
  }
]

const router = new VueRouter({
  routes
})

/**
 * @param to 将要访问的页面
 * @param from 从哪个页面请求过来
 * @param next 放行函数，处理放行逻辑
 */
router.beforeEach((to, from, next) => {
  // 访问登录页，直接放行
  if (to.path === '/login') {
    return next()
  }
  // 获取token,token失效跳转到登录页
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})

export default router

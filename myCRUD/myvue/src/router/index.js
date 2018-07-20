import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import Category from '@/components/category/Category'
import index from '@/components/user-list/'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'HelloWorld',
      component: Login
    },
    {
      path:'/home',
      component:Home,
      children:[
        {
          path:'/user-list',
          component:index
        }
      ]
    },
    {
      path:'/category',
      component:Category
    },
    
  ]
})
// 通过路由的导航守卫来显示登录状态的判断
// to,from 到哪去的路由对象
// next 放行的信号，如果调用这个方法，组件就会展示
router.beforeEach((to,from,next)=>{

  if(to.path === '/login'){
    next()
    return
  }
  const token = localStorage.getItem('token')
  if(token){
    next()
  }else{
    next('/login')
  }
})
export default router

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import index from '@/components/users/'
import Rights from '@/components/rights/Rights'
import Roles from '@/components/roles/Roles'
import Goods from '@/components/goods/Goods'
import Category from '@/components/categories/Category'
import GoodsAdd from '@/components/goods_add/GoodsAdd'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:"/",
      redirect:'/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path:'/home',
      component:Home,
      children:[
        {
          path:'/users',
          component:index
        },
        {
          path:'/rights',
          component:Rights
        },
        {
          path:'/roles',
          component:Roles
        },
        {
          path:'/categories',
          component:Category
        },
        {
          path:'/goods/:page?',
          component:Goods
        },
        {
          path:'/goods_add',
          component:GoodsAdd
        }
      ]
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

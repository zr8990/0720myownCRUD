import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import index from '@/components/userlist/index'
Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {
      path:'/login',
      component:Login,
    },
    {
      path:'/home',
      component:Home,
      children:[
        {
          path:'/userlist',
          component:index
        }
      ]
    }
  ]
})
// 导航守卫
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
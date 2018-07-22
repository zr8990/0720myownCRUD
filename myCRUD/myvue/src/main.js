import Vue from 'vue'
import App from './App'
import router from './router/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/index.less'
// 导入axios，添加得到vue的原型中，此时vue的实例对象就可以使用$http
import axios from 'axios'

Vue.prototype.$http = axios
// 配置axios的defaults的baseurl
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// axios请求拦截器
axios.interceptors.request.use(function(config){
  console.log('axios的请求拦截器')
  if(config.url.indexOf('login') <=-1){
    config.headers.Authorization = localStorage.getItem('token')
  }
  
  return config
})
// axios响应拦截器

Vue.use(ElementUI)

Vue.config.productionTip = false

 new Vue({
  el:'#app',
  router,
  components:{App},
  template:'<App></App>'
  
})

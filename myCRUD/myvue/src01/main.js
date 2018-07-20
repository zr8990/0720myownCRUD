// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 导入vue
import Vue from 'vue'
// 导入App组件,所有内容，都是在App组件中展示的
import App from './App'
// 导入路由，router文件夹下面的index.js
import router from './router'

// 下载element-ui安装，并导入使用
import ElementUI from 'element-ui'
// 引入element-ui的样式
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.less'

Vue.use(ElementUI);

// 设置为false，以阻止vue在生产环境中中的提示
Vue.config.productionTip = false
// 以下注释表示紧挨着下一行代码不再使用Eslint进行校验
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },

  template: '<App/>'

})

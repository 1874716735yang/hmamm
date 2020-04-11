/*
vuex使用和路由很相似
它也是借助一个插件帮我们实现的，这个插件就叫vuex
1:安装   npm i  vuex  
2:导入   import Vuex from "vuex"
3:注册  import Vue from "vue"    Vue.use(Vuex)
4:实例化 const store=  new Vuex.Store({
          // 共享数据管理
          state:{
           xxx:"123"
          }
          })  
 输入出去  export default store
5:在main文件中注入到vue实例
 导入vuex实例对象   import store from '@/store/index.js'
  注入到new Vue实例 
   new Vue({
     store
   })

使用：访问共享数据  this.$store.state.xxx可以访问到我们定义的数据
*/
import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        userInfo: ""
    }
})
export default store
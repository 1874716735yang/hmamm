// 1.导入路由
import VueRouter from 'vue-router'
// 注册
import Vue from 'vue'
// 导入登录页组件
import login from '@/view/login/login.vue'
Vue.use(VueRouter)


const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: login
        }
    ]
})
export default router
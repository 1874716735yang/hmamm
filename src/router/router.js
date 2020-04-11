// 1.导入路由
import VueRouter from 'vue-router'
// 注册
import Vue from 'vue'
// 导入登录页组件
import login from '@/view/login/login.vue'
// 导入主页
import layout from '../view/home/layout.vue'
import chart from '../view/home/chart/chart.vue'
import userList from '../view/home/userList/userList.vue'
import question from '../view/home/question/question.vue'
import business from '../view/home/business/business.vue'
import subject from '../view/home/subject/subject.vue'
Vue.use(VueRouter)


const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: login
        },
        {
            path: "/home",
            redirect: "/home/subject",
            component: layout,
            children: [{
                path: "chart",
                component: chart,
                meta: {
                    teta: "数据概览",
                    secret: "我是还没有写完的标签"
                }
            },
            {
                path: "userList",
                component: userList,
                meta: {
                    teta: "用户列表",
                    secret: "我是还没有写完的标签"
                }
            },
            {
                path: "question",
                component: question,
                meta: {
                    teta: "题库列表",
                    secret: "我是还没有写完的标签"
                }
            },
            {
                path: "business",
                component: business,
                meta: {
                    teta: "企业列表",
                    secret: "我是还没有写完的标签"
                }
            },
            {
                path: "subject",
                component: subject,
                meta: {
                    teta: "学科列表",
                    secret: "我是还没有写完的标签"
                }
            },]
        },

    ]
})
// 路由守卫
// 进入前守卫
// 导入nprogress   start()开启    done()结束
import NProgress from 'nprogress'
// 导入nprogress对应css
import 'nprogress/nprogress.css'
// css需要导入
router.beforeEach((to, from, next) => {
    // 进度条开启
    NProgress.start()
    next()

})
// 进入后守卫
router.afterEach((to, from) => {
    // 进度条结束
    NProgress.done()
    document.title = to.meta.teta
    window.console.log(from)
})
// 输出 出去
export default router
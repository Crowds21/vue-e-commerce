import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from "../components/Home";

Vue.use(VueRouter)

const routes = [
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login},
    {path: '/home', component: Home}
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});


//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
    //to 将要访问的页面
    //from 来自于哪个页面
    // next() 放行判断函数   next('/login')强制转跳
    //访问登录页面直接放行
    if(to.path == '/login') return next();
    //获取token
    const tokenStr = window.sessionStorage.getItem('token');
    //如果没有token或者Token为空，则强制转跳到登陆页面
    if(!tokenStr) return next('/login');
    //一定要有下面这句next()即意味着允许跳转
    next();
});

export default router

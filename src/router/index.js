//该文件专门用于创建整个文件的路由器
import VueRouter from "vue-router";
//引入组件
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Mall from "../views/Mall.vue";
import PageOne from "../views/PageOne.vue";
import PageTwo from "../views/PageTwo.vue";
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Cookie from 'js-cookie'
//创建一个路由器
const router =  new VueRouter({
    routes:[          
        //子路由
            {path:'/',redirect:'/login',component:Main},//首页
            {path:'/home',component:Home ,name:"home",},//首页
            {path:'/user',component:User,name:"user",},//用户管理
            {path:'/mall',component:Mall, name:'mall'},//商品管理
            {path:'/page1',component:PageOne,name:'page1'},//商品管理
            {path:'/page2',component:PageTwo,name:'page2'},//商品管理
            {path:'/login',component:Login,name:'login'},//登陆页面
    ]
})

router.beforeEach((to,from,next)=>{
    //判断token是否存在
    const token =  Cookie.get('token')
    //token不存在跳转登录页 存在则登陆成功
    if(!token && to.name !== 'login'){
        next({name:'login'})
    }else if(token && to.name === 'login'){
        next({name:'home'})
    }else{
        next()
    }
})

export default router
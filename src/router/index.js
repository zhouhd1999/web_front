import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index/Index.vue'
import PersonalDiary from '../views/Personal/PersonalDiary'
import PersonalShow from "../views/Personal/PersonalShow";
import Java from "../views/Technology/Java";
import C from "../views/Technology/C";
import Python from "../views/Technology/Python";
import Sponsorship from "../views/Sponsorship/Sponsorship";
import LeaveMessage from "../views/LeaveMessage/LeaveMessage";
import Person from "../views/Person";
import Body from "../views/Body";
import Article_edit from "../views/Article_edit";
import Article from "../views/Article";
import Background from "../views/Background";
import Technology from "../views/Technology/Technology";
import PHP from "../views/Technology/PHP";
import Other from "../views/Technology/Other";
import Welfare from "../views/Welfare/Welfare";
import UserController from "../views/UserController";
import ArticleManagement from "../views/ArticleManagement";
import Contribution from "../views/Contribution";
import TagManagement from "../views/TagManagement";
import AboutMe from "../views/AboutMe/AboutMe";



Vue.use(VueRouter);

//防止多次点击同一路径报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const routes = [
  //默认路径
  {
    path: '/',
    name: 'Body',
    component: Body,
    children:[ {
      path: '/',
      name: 'Index',
      component: Index
    },]
  },
  {
    path:'/Body',
    name:'Body',
    component:Body,
    children:[
      {
        path: '/',
        name: 'Index',
        component: Index
      },
      {
        path:'PersonalShow',
        name:'PersonalShow',
        component:PersonalShow,
      },
      {
        path:'PersonalDiary',
        name:'PersonalDiary',
        component:PersonalDiary,
      },
      {
        path:'Java',
        name:'Java',
        component:Java,
      },
      {
        path:'C',
        name:'C',
        component:C,
      },
      {
        path:'Other',
        name:'Other',
        component:Other,
      },
      {
        path:'PHP',
        name:'PHP',
        component:PHP,
      },
      {
        path:'AboutMe',
        name:'AboutMe',
        component:AboutMe,
      },
      {
        path:'Python',
        name:'Python',
        component:Python,
      },
      {
        path:'Sponsorship',
        name:'Sponsorship',
        component:Sponsorship,
      },
      {
        path:'Technology',
        name:'Technology',
        component:Technology,
      },
      {
        path:'LeaveMessage',
        name:'LeaveMessage',
        component:LeaveMessage,
      },
      {
        path:'Welfare',
        name:'Welfare',
        component:Welfare,
      },
    ]
  },
  {
    path:'/Background',
    name:'Background',
    component:Background,
    meta: {
      requirePermission: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [
      {
        path: 'UserController',
        name: 'UserController',
        component: UserController,

      },
      {
        path: 'ArticleManagement',
        name: 'ArticleManagement',
        component: ArticleManagement,
      },
      {
        path: 'Contribution',
        name: 'Contribution',
        component: Contribution,
      },
      {
        path: 'TagManagement',
        name: 'TagManagement',
        component:TagManagement,
      }

    ]
  },
  {
    path:'/Person',
    name:'Person',
    component:Person,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path:'/Article_edit',
    name:'Article_edit',
    component:Article_edit,
  },
  {
    path:'/Article',
    name:'Article',
    component:Article,
  },
  {
    path:'/UserController',
    name:'UserController',
    component:UserController,
    meta: {
      requirePermission: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path:'/ArticleManagement',
    name:'ArticleManagement',
    component:ArticleManagement,
    meta: {
      requirePermission: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path:'/Contribution',
    name:'Contribution',
    component:Contribution,
    meta: {
      requirePermission: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path:'/TagManagement',
    name:'TagManagement',
    component:TagManagement,
    meta: {
      requirePermission: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  if (to.meta.requirePermission) {  // 判断该路由是否需要登录权限
    if (sessionStorage.getItem('userPermission')==='0') {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/',
        //query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }else if (to.meta.requireAuth){
    if (sessionStorage.length>0) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/',
        //query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})

export default router

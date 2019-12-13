import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index/Index.vue'
import PersonalEssay from '../views/Personal/PersonalEssay'
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
import aaa from "../views/aaa/aaa"

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
    children:[{
        path:'PersonalEssay',
        name:'PersonalEssay',
        component:PersonalEssay,
      },
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
        path:'aaa',
        name:'aaa',
        component:aaa,
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
        path:'LeaveMessage',
        name:'LeaveMessage',
        component:LeaveMessage,
      }]
  },


  {
    path:'/Person',
    name:'Person',
    component:Person,
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



  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

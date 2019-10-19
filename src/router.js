import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Regist from "./components/Regist/Regist.vue"
import Login from "./components/Login/Login.vue"
import MainPage from "./components/MainPage/MainPage.vue"
import Friend from "./components/Friend/Friend.vue"
import Message from "./components/Message/Message.vue"
import My from "./components/My/My.vue"
import UserPage from "./components/UserPage/UserPage.vue"
import CreateMultipleTalk from "./components/Message/CreateMultipleTalk.vue"
import SingleTalk from "./components/Message/SingleTalk.vue"
import Notify from "./components/Notify/Notify.vue"
import Error from "./components/404/404.vue"
import store from "../src/store"
Vue.use(Router)

const router= new Router({
  routes: [
    {
      path:"/404",
      name:"404",
      component:Error,
    },
    {
      path:"/Regist",
      name:"Regist",
      component:Regist
    },
    {
      path:"/",
      name:"Login",
      component:Login
    },    
    {
      path:"/Login",
      name:"Login",
      component:Login
    },
    {
      path:"/MainPage",
      name:"MainPage",
      component:MainPage,
      redirect:"/MainPage/Friend",
      meta:{
        requiresAuth:true
      },
      children:[
        {
            path:"Friend",
            name:"Friend",
            component:Friend,
            meta:{
              requiresAuth:true
            }
        },
        {
            path:"Message",
            name:"Message",
            component:Message,
            meta:{
              requiresAuth:true
            }
        },
        {
             path:"My",
             name:"My",
             component:My,
             meta:{
              requiresAuth:true
            }
        },
        {
          path:"Notify",
          name:"Notify",
          component:Notify,
          meta:{
            requiresAuth:true
          }
        }
      ]
    },
    {
      path:"/UserPage",
      name:"UserPage",
      component:UserPage,
      meta:{
        requiresAuth:true
      }
    },
    {
      path:"/CreateMultipleTalk",
      name:"CreateMultipleTalk",
      component:CreateMultipleTalk,
      meta:{
        requiresAuth:true
      }
    },
    {
      path:"/SingleTalk",
      name:"SingleTalk",
      component:SingleTalk,
      meta:{
        requiresAuth:true
      }
    },
    {
      path:"*",
      redirect:"/404"
  }
  ]
})
router.beforeEach((to, from, next) => {
  let token = store.state.token; 
  console.log(token);
  if (to.meta.requiresAuth) {
   if (token) {
      next();
   } else {
    next({
     path: '/Login',
    });
   }
  } else{ 
   next();
  } 
  });
  export default router;

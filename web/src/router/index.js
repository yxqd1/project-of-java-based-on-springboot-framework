import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from "../views/pk/PkIndexView"
import RecordIndexView from "../views/record/RecordIndexView"
import RankListIndexView from "../views/ranklist/RankListIndexView"
import UserBotIndexView from "../views/user/bot/UserBotIndexView"
import NotFound from "../views/error/NotFound"
import UserAccountLoginView from '../views/user/account/UserAccountLoginView'
import UserAccountRegisterView from '../views/user/account/UserAccountRegisterView'

// 地址锁定页面
const routes = [
  // 根目录重定向
  {
    Path: "/",
    name:"home",
    redirect:"/pk/"
  },
  {
    path:"/pk/",
    name:"pk_index",
    component:PkIndexView,
  },
  {
    path:"/record/",
    name:"record_index",
    component:RecordIndexView ,
  },
  {
    path:"/ranklist/",
    name:"ranklist_index",
    component:RankListIndexView,
  },
  {
    path:"/user/bot/",
    name:"user_bot_index",
    component:UserBotIndexView,
  },
  {
    path:"/user/account/login/",
    name:"user_account_login",
    component:UserAccountLoginView,
  },
  {
    path:"/user/account/register/",
    name:"user_account_register",
    component:UserAccountRegisterView,
  },
  {
    path:"/404/",
    name:"404",
    component:NotFound,
  },
  // 错误地址重定向
  {
    path:"/:catchAll(.*)",
    redirect:"/404/"
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

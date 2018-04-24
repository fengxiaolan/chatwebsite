import Vue from 'vue'
import Router from 'vue-router'
import Show from '../view/Show.vue'
import Activity from '../view/Activity.vue'
import Search from '../view/Search.vue'
import Loan from '../view/Loan.vue'
import Robot from '../view/Robot'
import Home from '../view/Home'
import Register from '../view/Register'
import Login from '../view/Login'
import Chat from '../view/Chat.vue'
import ChatHistory from '../view/ChatHistory.vue'
import BaseTransition from '../BaseTransition.vue'
import loading from '../components/loading/loading'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'BaseTransition',
      component: BaseTransition,
      children: [
        {
          path: '',
          name: 'index',
          component: Show
        },
        {
          path: '/loan',
          name: 'loan',
          component: Loan
        },
        {
          path: '/chat',
          name: 'chat',
          component: Chat
        },
        {
          path: '/chat-history',
          name: 'chat-history',
          component: ChatHistory
        },
        {
            path: '/activity',
            name: 'activity',
            component: Activity
        },
        {
            path: '/search',
            name: 'search',
            component: Search
        }
      ]
    },
    {
      path: '/robot',
      name: 'Robot',
      component: Robot
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   loading.show()
//   next()
// })
//
// router.afterEach(route => {
//   loading.hide()
// })

export default router

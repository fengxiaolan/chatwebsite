import Vue from 'vue'
import Router from 'vue-router'
import Show from '../view/Show'
import Activity from '../view/Activity'
import Search from '../view/Search'
import Door from '../view/Door'
import Loan from '../view/Loan'
import Robot from '../view/Robot'
import Home from '../view/Home'
import Register from '../view/Register'
import Login from '../view/Login'
import Chat from '../view/Chat'
import ChatHistory from '../view/ChatHistory'
import BaseTransition from '../BaseTransition'
import loading from '../components/loading/loading'
import Service from '../components/Service'
import Story from '../components/Story'
import Beatatc from '../components/Beatatc'
import Addr from '../components/Addr'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'BaseTransition',
    //   component: BaseTransition,
    //   children: [
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
        },
    //   ]
    // },
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
    },
    {
        path: '/door',
        name: 'door',
        component: Door,
        children: [
            {
                path: '/service',
                name: 'service',
                component: Service
            },
            {
                path: '/story',
                name: 'story',
                component: Story
            },
            {
                path: '/beatatc',
                name: 'beatatc',
                component: Beatatc
            },
            {
                path: '/addr',
                name: 'addr',
                component: Addr
            }
        ]
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

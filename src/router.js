import Vue from 'vue'
import Router from 'vue-router'
import AgilityPage from "./agility/AgilityPage";
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      component: AgilityPage
    }
  ]
})

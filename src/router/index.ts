import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

Vue.use(Router)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Notes',
    component: () => import(/* webpackChunkName: "Notes page" */ '@/views/Notes.vue')
  },
  {
    path: '/notes/:id',
    name: 'Note',
    component: () => import(/* webpackChunkName: "Note page" */ '@/views/Note.vue')
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router

import { createRouter, createWebHistory } from "vue-router"
import PostsView from "../views/PostsView.vue"
import AuthView from "../views/AuthView.vue"
import Register from "@/components/Auth/Register.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: PostsView,
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(
        /* webpackChunkName: "about" */ "@/views/AuthView.vue"
      )
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: function() {
      return import(
        "@/views/AuthView.vue"
      )
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

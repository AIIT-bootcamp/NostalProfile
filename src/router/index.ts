import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/about.vue"),
    },
    {
      path: "/new",
      name: "new",
      component: () => import("../pages/new.vue"),
    },
    {
      path: "/posts/:id",
      name: "post",
      component: () => import("../pages/posts/index.vue"),
    },
  ],
});

export default router;

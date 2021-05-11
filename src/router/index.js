import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("../views/Home.vue") },
      { path: "/login", component: () => import("../views/Login.vue") },
      { path: "/register", component: () => import("../views/Register.vue") },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "ant-menu-item-selected",
  base: process.env.BASE_URL,
  routes,
});

export default router;

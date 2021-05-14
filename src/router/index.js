import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default function init(store) {
  return new VueRouter({
    mode: "history",
    linkActiveClass: "ant-menu-item-selected",
    base: process.env.BASE_URL,
    routes: [
      {
        path: "/",
        name: "Home",
        component: () => import("../layouts/MainLayout.vue"),
        children: [
          { path: "", component: () => import("../views/Home.vue") },
          {
            path: "/dashboard",
            component: () => import("../views/Dashboard.vue"),
            beforeEnter(to, from, next) {
              if (!store.state.user) return next("/login");
              next();
            },
          },
          {
            path: "/login",
            component: () => import("../views/Login.vue"),
            beforeEnter(to, from, next) {
              if (store.state.user) return next("/");
              next();
            },
          },
          {
            path: "/register",
            component: () => import("../views/Register.vue"),
            beforeEnter(to, from, next) {
              if (store.state.user) return next("/");
              next();
            },
          },
        ],
      },
    ],
  });
}

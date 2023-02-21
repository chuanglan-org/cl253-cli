/*
 * 路由规则，以相对路径方式建立，方便日后检索
 */
import { lazy } from "react";
export default [
  {
    path: "/control",
    component: lazy(() => import("pages/layout")),
    children: [
      {
        path: "home",
        component: lazy(() => import("pages/home")),
      },
      {
        path: "list",
        component: lazy(() => import("pages/list")),
      },
    ],
  },
  {
    path: "/login",
    component: lazy(() => import("pages/login")),
  },
];

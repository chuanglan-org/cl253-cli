/*
 * 路由规则，以相对路径方式建立，方便日后检索
 */
import { lazy } from "react";
export default [
  {
    path: "/home",
    component: lazy(() => import("pages/home")),
  },
  // 活动中心
  {
    path: "/list",
    children: [
      { path: "test1", component: lazy(() => import("pages/list")) },
      {
        path: "test2",
        component: lazy(() => import("pages/list")),
      },
    ],
  },
];

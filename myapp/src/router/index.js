import { lazy } from "react";
export default [
  {
    path: "/home",
    name: "home",
    exact: true,
    state: {
      a: 11,
    },
    component: lazy(() => import("pages/home")),
  },
];

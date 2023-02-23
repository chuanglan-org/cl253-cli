import React from "react";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import Menu from "./comps/menu";
import AnimateSwitch from "./comps/animate_switch";
import NoAuth from "pages/nopage/no_auth";
import PageRoutes from "@/router/index";
import style from "./style.module.less";

/* ========== 递归遍历路由组件函数 ========== */
const routerFn = (children) => {
  return children.map((item) => {
    if (item.children?.length > 0) {
      return (
        <Route path={item.path} key={item.path} element={item.component ? <item.component /> : <Outlet />}>
          {routerFn(item.children)}
        </Route>
      );
    } else {
      let comp = item.auth ? <NoAuth /> : <item.component />;
      return <Route path={item.path} key={item.path} element={comp} />;
    }
  });
};
function LayoutIndex() {
  return (
    <div className={style.child_wrap}>
      <BrowserRouter basename={`/control/${process.env.baseName}`}>
        <Menu />
        <div className={style.child_content_wrap}>
          <AnimateSwitch>
            <Routes>
              <Route path="/" element={<Outlet />}>
                <Route index element={<Navigate replace to="home" />} />
                {routerFn(PageRoutes)}
              </Route>
            </Routes>
          </AnimateSwitch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default LayoutIndex;

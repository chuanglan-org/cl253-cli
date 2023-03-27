import React, { Suspense } from "react";
import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import AnimateSwitch from "components/animate_switch";
import { store, AppProvider } from "@/redux/index";
import PageRoutes from "@/router/index";
import PageLoad from "components/page_load";
import Nprogressload from "components/page_load/nprogress_load";
import "assets/style/style.less";
import theme from "assets/style/theme.json";

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
dayjs.locale("zh-cn");

/* ========== 递归遍历路由组件函数 ========== */
const routerFn = (children, type) => {
  return children.map((item) => {
    if (item.children?.length > 0) {
      return (
        <Route
          path={item.path}
          key={item.path}
          element={
            item.component ? (
              <Suspense fallback={<PageLoad />}>
                <item.component />
              </Suspense>
            ) : (
              <Outlet />
            )
          }
        >
          {routerFn(item.children, true)}
        </Route>
      );
    } else {
      return (
        <Route
          path={item.path}
          key={item.path}
          element={
            <Suspense fallback={type ? <Nprogressload /> : <PageLoad />}>
              <item.component />
            </Suspense>
          }
        />
      );
    }
  });
};

const App = () => {
  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      <AppProvider store={store}>
        <BrowserRouter basename="/">
          <AnimateSwitch>
            <Routes>
              <Route path="/" element={<Outlet />}>
                <Route index element={<Navigate replace to="/control/home" />} />
                {routerFn(PageRoutes)}
              </Route>
            </Routes>
          </AnimateSwitch>
        </BrowserRouter>
      </AppProvider>
    </ConfigProvider>
  );
};
const root = createRoot(document.getElementById("app"));
root.render(<App />);

import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./style.module.less";
import Menu from "./comps/menu";
import TopHeader from "./comps/top_header";
import { useSelector } from "react-redux";
import NProgress from "nprogress";
export default () => {
  const { collapsed } = useSelector((state) => state.system);
  const routerLoaction = useLocation();

  useEffect(() => {
    NProgress.done(true);
  }, [routerLoaction]);

  return (
    <div className={`${styles.layout_wrap}`}>
      <div className={styles.content_wrap}>
        <Menu />
        <TopHeader />
        <div className={`${styles.child_wrap} ${collapsed ? styles.close_menu : ""}`}>
          <div className={styles.child_content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

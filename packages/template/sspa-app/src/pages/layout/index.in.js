import React, { useEffect, useState } from "react";
import Layout from "./index";
export default () => {
  const [loadingIn, setLoadingIn] = useState(true);
  useEffect(() => {
    // 该页面一般做业务层的拦截是否进入主框架
    setTimeout(() => {
      setLoadingIn(false);
      if (window.__POWERED_BY_QIANKUN__) {
        // 如果微应用嵌入访问
        window.globalStore.main.dispatch({ type: "SET_LOADSKELETON", loadSkeleton: false });
      }
    }, 1000);
  }, []);
  return !loadingIn && <Layout />;
};

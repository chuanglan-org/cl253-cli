import React, { useEffect } from "react";
import NProgress from "nprogress";
export default () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);
  return <></>;
};

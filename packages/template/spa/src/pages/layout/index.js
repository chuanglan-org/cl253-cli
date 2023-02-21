import React, { useCallback, useEffect, useState } from "react";
import PageLoad from "components/page_load";
import { Navigate } from "react-router-dom";
import Layout from "./layout";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slice/slice_system";
import axios from "@/plugins/axios";

export default () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  /* ========== 验证token获得基本信息 ========== */
  const checkTokenAndGetUser = useCallback(() => {
    axios.post("/control/user/basic_info").then((res) => {
      if (res.code === "000000") {
        dispatch(setUserInfo(res.data));
        setIsLogin(true);
        setPageLoading(false);
      } else {
        setIsLogin(false);
        setPageLoading(false);
      }
    });
  }, [dispatch]);

  /* ========== 进入页面拦截 ========== */
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(true);
    setPageLoading(false);
    // if (!token) {
    //   setIsLogin(false);
    //   setPageLoading(false);
    // } else {
    //   checkTokenAndGetUser();
    // }
  }, [checkTokenAndGetUser]);

  return pageLoading ? <PageLoad /> : isLogin ? <Layout /> : <Navigate replace to="/login" />;
};

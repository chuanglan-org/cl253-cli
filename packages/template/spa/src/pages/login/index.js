import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import styles from "./style.module.less";
import { useNavigate } from "react-router-dom";
export default () => {
  const navigate = useNavigate();
  /* ========== 跳转登录 ========== */
  const toHome = () => {
    navigate("/control/home");
  };
  return (
    <div className={styles.login_wrap}>
      <h3>我是登录登录页面</h3>
      <Button type="primary" onClick={toHome}>
        跳转登录
      </Button>
    </div>
  );
};

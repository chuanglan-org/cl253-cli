import React from "react";
import { Spin } from "antd";
import styles from "./style.module.less";
export default () => {
  return (
    <div className={styles.page_load_wrap}>
      <Spin size="large" tip="页面加载中..." />
    </div>
  );
};

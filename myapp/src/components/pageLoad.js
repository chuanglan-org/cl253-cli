import React from "react";
import { Spin } from "antd";
export default () => {
  return (
    <div style={{ position: "absolute", left: "45%", top: "45vh" }}>
      <Spin size="large" tip="页面加载中..." />
    </div>
  );
};

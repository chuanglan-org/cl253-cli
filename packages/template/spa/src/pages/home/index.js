import React, { useState, useEffect, useMemo, useCallback } from "react";
import Box from "components/box";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  return (
    <Box title="应用列表">
      <div>我是首页</div>
      <Button
        type="primary"
        onClick={() => {
          navigate("/login");
        }}
      >
        跳转登录页面
      </Button>
    </Box>
  );
};

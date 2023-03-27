import React, { useState, useEffect, useMemo, useCallback } from "react";
import Box from "components/box";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  return (
    <Box title="应用列表">
      <div>首页1</div>
      <Button
        type="primary"
        onClick={() => {
          navigate("/login");
        }}
      >
        登录页面
      </Button>
    </Box>
  );
};

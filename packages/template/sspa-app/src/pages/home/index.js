import React from "react";
import Box from "components/box";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box title="应用列表">
      <div>首页</div>
      <Button
        type="primary"
        onClick={() => {
          navigate("/login");
        }}
      >
        按钮
      </Button>
    </Box>
  );
};

export default Home;

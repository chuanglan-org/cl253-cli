import React, { Suspense } from "react";
import { ConfigProvider } from "antd";
import { store, AppProvider } from "@/redux/index";
import Nprogressload from "components/page_load/nprogress_load";
import "assets/style/style.less";
import theme from "assets/style/theme.json";
import LayoutIn from "pages/layout/index.in";

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
dayjs.locale("zh-cn");

const App = () => {
  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      <AppProvider store={store}>
        <Suspense fallback={<Nprogressload />}>
          <LayoutIn />
        </Suspense>
      </AppProvider>
    </ConfigProvider>
  );
};
export default App;

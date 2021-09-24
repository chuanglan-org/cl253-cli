import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import PageLoad from "components/pageLoad";
import moment from "moment";
import "moment/locale/zh-cn";
import "assets/style/childStyle.less";
import Layout from "pages/layout";

moment.locale("zh-cn");

const App = (props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={props.store}>
        <Suspense fallback={<PageLoad />}>
          <Layout />
        </Suspense>
      </Provider>
    </ConfigProvider>
  );
};
export default App;

import React, { useEffect } from "react";
import style from "./style";
export default () => {
  return (
    <div className={style.nopage_wrap}>
      <div className={style.no_content}>
        <aside className={style.img}>
          <img src="https://static.253.com/zzt_assets/img/404.png" />
        </aside>
        <section className={style.txt}>
          <h3>抱歉，页面无法访问！</h3>
          <p>可能原因：网络信号差，找不到请求页面，输入网址不正确 请检查地址是否正确，或刷新页面</p>
          <a
            onClick={() => {
              window.routerHistory && window.routerHistory.replace("/home");
            }}
          >
            返回首页 &gt;
          </a>
        </section>
      </div>
    </div>
  );
};

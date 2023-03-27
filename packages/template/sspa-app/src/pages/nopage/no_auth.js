import React, { useEffect } from "react";
import style from "./style";
export default () => {
  return (
    <div className={style.nopage_wrap}>
      <div className={style.no_content}>
        <aside className={style.img}>
          <img src="https://static.253.com/zzt_assets/img/noauth.png" />
        </aside>
        <section className={style.txt}>
          <h3>抱歉，该页面没有访问的权限</h3>
          <p>可能原因：账户中心模块下的辅助账户管理设置角色配置权限时没有选中，可以联系对应的权限管理员</p>
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

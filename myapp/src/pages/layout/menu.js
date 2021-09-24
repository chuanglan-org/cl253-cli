import React, { useState } from "react";
import style from "./layout.less";
import ScrollBar from "components/scrollBar";
import { NavLink } from "react-router-dom";
import MyIcon from "components/myIcon";
export default () => {
  const [navList, setNav] = useState([
    { name: "概览", path: "/home" },
    {
      name: "短信编辑",
      active: true,
      children: [
        { name: "在线发送", path: "/list" },
        { name: "变量发送", path: "/list2" },
      ],
    },
    {
      name: "短信编辑",
      active: false,
      children: [
        { name: "在线发送", path: "/list3" },
        { name: "变量发送", path: "/list5" },
      ],
    },
  ]);

  const openNav = (item, index) => {
    item.active = !item.active;
    navList.splice(index, 1, item);
    setNav([...navList]);
  };
  return (
    <div className="child_menuWrap">
      <div className={style.menu_content}>
        <h2 className={style.childTitle}>短信验证码</h2>
        <div className={style.nav_wrap}>
          <ScrollBar>
            {navList.map((item, index) => {
              return (
                <div className={style.nav_list} key={index}>
                  {item.path ? (
                    <NavLink to={item.path} activeClassName={style.active}>
                      {item.name}
                    </NavLink>
                  ) : (
                    <p
                      onClick={() => {
                        openNav(item, index);
                      }}
                    >
                      <span>{item.name}</span>
                      <MyIcon
                        type="dropdown-line"
                        className={`${style.nav_arrow} ${item.active ? style.active : ""}`}
                      />
                      {item.active}
                    </p>
                  )}
                  {item.children && item.children.length > 0 && (
                    <div
                      className={`${style.childnav} ${item.active ? style.active : ""}`}
                      style={{ height: item.active ? `${item.children.length * 42}px` : "0" }}
                    >
                      {item.children.map((child, key) => {
                        return (
                          <NavLink to={child.path} activeClassName={style.active} key={key}>
                            {child.name}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </ScrollBar>
        </div>
      </div>
    </div>
  );
};

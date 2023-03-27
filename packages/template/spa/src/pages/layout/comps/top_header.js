import React, { useState, createContext, useContext, useEffect } from "react";
import MyIcon from "components/my_icon";
import styles from "../style.module.less";
import { Dropdown, Menu, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCollapsed, setUserInfo } from "@/redux/slice/slice_system";
export default () => {
  const { collapsed, userInfo } = useSelector((state) => state.system);
  const dispatch = useDispatch();

  const Navigate = useNavigate();
  /* ========== 退出登录 ========== */
  const handleGoOut = () => {
    localStorage.removeItem("token");
    dispatch(setUserInfo({}));
    Navigate("/login", { replace: true });
  };

  const menu = (
    <Menu style={{ marginTop: "6px" }}>
      <Menu.Item>
        <div onClick={handleGoOut}>
          <Space>
            <MyIcon type="icon-tuichu" />
            退出登录
          </Space>
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={`${styles.top_header_wrap} ${collapsed ? styles.close_menu : ""}`}>
      <div className={styles.top_header_content}>
        <div
          className={styles.open_menu_btn}
          onClick={() => {
            dispatch(setCollapsed(!collapsed));
          }}
        >
          {!collapsed ? <MyIcon type="dingbushouqi" /> : <MyIcon type="dingbuzhankai" />}
        </div>
        <div className={styles.user_info}>
          <div className={styles.user_img}>
            <img src="https://static.253.com/images/header_default.png" alt="头像" />
          </div>
          {userInfo.user_name && (
            <div className={styles.user_text}>
              <Dropdown placement="bottomRight" overlay={menu}>
                <div>
                  <h3>{userInfo.user_name}</h3>
                  <p>{userInfo.open_id}</p>
                </div>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

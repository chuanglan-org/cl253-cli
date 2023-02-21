import React, { useState, useMemo, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppstoreOutlined, ContainerOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import styles from "../style.module.less";
import { useSelector } from "react-redux";

export default memo(() => {
  const [openKeys, setOpenKeys] = useState(["10100"]);
  const { collapsed } = useSelector((state) => state.system);
  const routerLoaction = useLocation();
  const navigate = useNavigate();
  /* ========== 菜单拦 ========== */
  const MenuList = useMemo(() => {
    return [
      {
        label: "首页",
        path: "/control/home",
        key: "1000",
        icon: <AppstoreOutlined />,
        onClick: () => {
          navigate("/control/home");
        },
      },
      {
        label: "列表显示",
        path: "/control/list",
        key: "2000",
        icon: <ContainerOutlined />,
        onClick: () => {
          navigate("/control/list");
        },
      },
      {
        label: "列表显示",
        key: "3000",
        icon: <ContainerOutlined />,
        children: [
          {
            label: "子集11",
            path: "/control/list2",
            key: "3001",
            icon: <AppstoreOutlined />,
            onClick: () => {
              navigate("/control/list2");
            },
          },
          {
            label: "子集12",
            path: "/control/home",
            key: "3002",
            icon: <AppstoreOutlined />,
            onClick: () => {
              navigate("/control/list2");
            },
          },
        ],
      },
    ];
  }, [navigate]);

  /* ========== 匹配当前打开的路由页 ========== */
  const { defaultSelectedKeys } = useMemo(() => {
    let selectkey = [];
    for (let i = 0; i < MenuList.length; i++) {
      let item = MenuList[i];
      if (routerLoaction.pathname.indexOf(item.path) === 0) {
        selectkey.push(item.key);
        break;
      }
      if (item.children?.length > 0) {
        for (let y = 0; y < item.children.length; y++) {
          const child = item.children[y];
          if (routerLoaction.pathname.indexOf(child.path) === 0) {
            selectkey.push(child.key);
            setOpenKeys((_list) => {
              let arr = [..._list];
              arr.push(item.key);
              return Array.from(new Set(arr));
            });
            break;
          }
        }
      }
    }
    return {
      defaultSelectedKeys: selectkey,
    };
  }, [routerLoaction.pathname, MenuList]);

  return (
    <div className={`${styles.menu_wrap} ${collapsed ? styles.close_menu : ""}`}>
      <div className={styles.menu_content}>
        <div className={styles.logo_wrap}>
          {!collapsed ? (
            <img src="https://static.253.com/images/logo_max.png" alt="logo" className={styles.max_img} />
          ) : (
            <img src="https://static.253.com/images/logo_min.png" alt="logo" className={styles.min_img} />
          )}
        </div>
        <div className={styles.nav_wrap}>
          <div className={styles.scrollbar}>
            <div className={styles.scroll_wrap}>
              <Menu
                defaultSelectedKeys={defaultSelectedKeys}
                openKeys={openKeys}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={MenuList}
                onOpenChange={setOpenKeys}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

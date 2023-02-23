import React, { useMemo, useState } from "react";
import ScrollBar from "components/scroll_bar";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import styles from "../style.module.less";

import MyIcon from "components/my_icon";

function APPMenu() {
  const [openKeys, setOpenKeys] = useState(["10100"]);
  const routerLoaction = useLocation();
  const navigate = useNavigate();

  /* ========== 菜单拦 ========== */
  const MenuList = useMemo(() => {
    return [
      {
        label: "首页",
        path: "/home",
        key: "1000",
        onClick: () => {
          navigate("home");
        },
      },
      {
        label: "列表显示",
        path: "/list",
        key: "2000",
        onClick: () => {
          navigate("list");
        },
      },
      {
        label: "列表显示",
        key: "3000",
        children: [
          {
            label: "子集11",
            path: "/list/test2",
            key: "3001",
            onClick: () => {
              navigate("/list/test2");
            },
          },
          {
            label: "子集12",
            path: "list2",
            key: "3002",
            onClick: () => {
              navigate("/list/test2");
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
    <div className={styles.child_menu_wrap}>
      <div className={styles.menu_content}>
        <h2 className={styles.childTitle}>微应用标题</h2>
        <div className="nav_wrap">
          <ScrollBar>
            <Menu
              defaultSelectedKeys={defaultSelectedKeys}
              openKeys={openKeys}
              expandIcon={({ isOpen }) => {
                return (
                  <span className={styles.arrow}>
                    <MyIcon type="dropdown-line" className={`${styles.nav_arrow} ${isOpen ? styles.active : ""}`} />
                  </span>
                );
              }}
              mode="inline"
              theme="light"
              items={MenuList}
              onOpenChange={setOpenKeys}
            />
          </ScrollBar>
        </div>
      </div>
    </div>
  );
}

export default APPMenu;

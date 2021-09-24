import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyIcon from "components/myIcon";
import style from "./layout.less";
import headerimg from "assets/images/header_default.png";
const TopHeader = () => {
  const menuOpen = useSelector((state) => state.menuOpen); //窗口是否收缩
  const dispath = useDispatch();
  return (
    <div className={style.topheaderWrap}>
      <div className={style.topheader_cont}>
        <div
          className={`${style.list} ${style.menu_btn}`}
          onClick={() => {
            dispath({ type: "SET_MENUOPEN" });
          }}
        >
          <MyIcon type="shouqi" className={`${style.iconbtn}  ${menuOpen ? "" : style.menu_btn_close}`} />
        </div>
        <div className={style.header_right}>
          <div className={`${style.list} ${style.text_btn}`}>
            <p>财务</p>
          </div>
          <div className={`${style.list} ${style.text_btn}`}>
            <p>财务</p>
          </div>
          <div className={`${style.list} ${style.icon_btn}`}>
            <MyIcon type="start" />
          </div>
          <div className={`${style.list} ${style.icon_btn}`}>
            <MyIcon type="start" />
          </div>
          <div className={`${style.list} ${style.userinfo_btn}`}>
            <div className={style.userinfo_content}>
              <div className={style.headimg}>
                <img src={headerimg} alt="头像" />
              </div>
              <MyIcon type="xiala" className={style.arrow} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;

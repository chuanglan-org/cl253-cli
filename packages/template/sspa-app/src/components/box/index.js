import React from "react";
import styles from "./style.module.less";
const Box = (props) => {
  return (
    <div className={styles.box}>
      <div className={styles["box-title"]} style={{ borderBottom: props.noborder && "none" }}>
        {props.render ? (
          props.render
        ) : (
          <div>
            <span className={styles.title_name}>{props.title}</span>
          </div>
        )}
      </div>
      <div className={styles["box-content"]} style={props.boxContentStyle || {}}>
        {props.children}
      </div>
    </div>
  );
};

export default Box;

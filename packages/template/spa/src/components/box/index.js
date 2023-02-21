import React from "react";
import styles from "./style.module.less";
export default (props) => {
  return (
    <div className={styles.box}>
      <div className={styles.box_title}>
        <span className={styles.title_name}>{props.title}</span>
      </div>
      <div className={styles.box_content}>{props.children}</div>
    </div>
  );
};

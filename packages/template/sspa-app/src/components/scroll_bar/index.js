import React from "react";
import styles from "./style.module.less";
export default (props) => {
  return (
    <div className={styles.scrollbar}>
      <div className={styles.scroll_wrap}>{props.children}</div>
    </div>
  );
};

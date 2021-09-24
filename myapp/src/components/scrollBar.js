import React, { Component } from "react";
import style from "pages/layout/layout.less";
class ScrollBar extends Component {
  render() {
    return (
      <div className={style.scrollbar}>
        <div className={style.scroll_wrap}>{this.props.children}</div>
      </div>
    );
  }
}
export default ScrollBar;

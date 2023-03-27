import React from "react";
import { createRoot } from "react-dom/client";
import ChildApp from "./root";
const root = createRoot(document.getElementById("childRoot"));
const renderApp = () => {
  root.render(<ChildApp />);
};

/* ========== 如果是独立开发环境 ========== */
if (!window.__POWERED_BY_QIANKUN__) {
  renderApp();
}

// eslint-disable-next-line no-empty-function
export const bootstrap = async () => {};

export const mount = async () => {
  renderApp();
};
// eslint-disable-next-line no-empty-function
export const unmount = async (props) => {
  root.unmount(props.container ? props.container.querySelector("#childRoot") : document.getElementById("childRoot"));
};

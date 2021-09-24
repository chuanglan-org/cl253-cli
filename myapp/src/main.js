import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import RootComponent from "./root";
import store from "./redux";
if (!window.singleSpaNavigate) {
  ReactDOM.render(<RootComponent store={store} />, document.getElementById("childApp"));
}

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: (spa) => {
    let childStore = spa.globalStore.stores[spa.name];
    return <RootComponent store={childStore} />;
  },
  domElementGetter,
  errorBoundary(err, info, props) {
    return <div>加载错误</div>;
  },
});

export function bootstrap(props) {
  return reactLifecycles.bootstrap(props);
}

export function mount(props) {
  return reactLifecycles.mount(props);
}

export function unmount(props) {
  return reactLifecycles.unmount(props);
}

function domElementGetter() {
  let el = document.getElementById("childApp");
  if (!el) {
    el = document.createElement("div");
    el.id = "childApp";
    el.className = "childApp_wrap";
  }

  let timer = null;
  timer = setInterval(() => {
    if (document.querySelector("#layoutWrap")) {
      document.getElementById("childApp").remove();
      document.querySelector("#layoutWrap").appendChild(el);
      clearInterval(timer);
    }
  }, 5);

  return el;
}

import axios from "axios";
const { CancelToken } = axios;
const cancelTokenArr = {};

const _axios = axios.create({
  baseURL: "/api",
});

_axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && !config.notoken) {
      config.headers.token = token;
    }
    if (config.cancel) {
      config.cancelToken = new CancelToken((c) => {
        cancelTokenArr[config.cancel] = c;
      });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  (response) => {
    if (response.data?.code === "000403") {
      location.href = "/wxadmin/login";
    } else {
      return response.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

_axios.cancelAjax = (name, msg) => {
  if (cancelTokenArr[name]) {
    cancelTokenArr[name](msg || "强制中断了请求");
    cancelTokenArr[name] = null;
  }
};

export default _axios;

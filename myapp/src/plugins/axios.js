import axios from "axios";
const _axios = axios.create({
  baseURL: "/api",
});
_axios.interceptors.request.use(
  (config) => {
    config.headers.token = "1111";
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const res = error.response;
    if (
      res.status &&
      res.status === 403 &&
      (res.data.message === "invalid csrf token" || res.data.message === "missing csrf token")
    ) {
      return {
        status: "000403",
        msg: "验签不通过！请重新登录",
      };
    } else {
      return Promise.reject(error);
    }
  }
);

export default _axios;

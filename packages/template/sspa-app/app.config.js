// 更多配置信息 https://github.com/chuanglan-org/cl253-cli/blob/master/docs/appConfig.md
module.exports = {
  port: 8013,
  devOpen: false,
  Analyze: false,
  buildZip: true,
  publicPath: process.env.NODE_ENV === "development" ? "http://localhost:8013/" : "/",
  outputLibrary: {
    name: "whatsapp",
    type: "umd",
  },
  env: {
    baseName: "whatsapp",
  },
};

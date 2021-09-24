module.exports = {
  title:"App",
  appName: "App", //根目录名称
  port: 8001,
  autoOpen: false, //启动本地是否自动重启,默认不启动
  alias: {}, //目录别名如"@"表示src目录,"components"表示src/components目录，"pages"表示src/pages,"assets"表示src/assets
  analyzer: false, //打包大小监听
  proxy: {
    "/api": "http://localhost:3000", //跨域请求重写
  },
};

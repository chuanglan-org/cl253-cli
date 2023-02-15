module.exports = {
  title: "富媒体消息",
  appName: "5g-rcs", // 根目录名称
  port: 8012,
  autoOpen: false, // 启动本地是否自动重启,默认不启动
  alias: {}, // 目录别名如"@"表示src目录,"components"表示src/components目录，"pages"表示src/pages,"assets"表示src/assets
  analyzer: false, // 打包大小监听
  self: false, // 是否独立运行，如果是就加载样式
  proxy: {
    "/zzt_api/cwl_api/": {
      target: "http://cwldev.cm253.com", // stable
      changeOrigin: true,
      pathRewrite: { "^/zzt_api/cwl_api/": "/" },
    },
  },
};

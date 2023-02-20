"use strict";
const path = require("path");
const appPaths = require("../config/app_path");
const checkRequiredFiles = require("../utils/check_file");
const AppConfig = require("../config/app_config");
const getBaseConfig = require("../config/webpack.base");
const { createCompiler } = require("../utils/webpack_hook");
const WebpackDevServer = require("webpack-dev-server");
const clearConsole = require("../utils/clear_console");

process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

if (!checkRequiredFiles(Object.values(AppConfig.entry))) {
  process.exit(1);
}

const baseConfig = getBaseConfig(process.env.NODE_ENV); // 获得基本配置
const compiler = createCompiler(baseConfig); // 编译过程中的hook
const ignoredFiles = (appSrc) => {
  return new RegExp(`^(?!${escape(path.normalize(`${appSrc}/`).replace(/[\\]+/g, "/"))}).+/node_modules/`, "g");
};
const devServer = new WebpackDevServer(
  {
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    },
    open: AppConfig.devOpen
      ? {
          target: [`http://localhost:${AppConfig.port}`],
        }
      : false,
    compress: true,
    static: {
      directory: appPaths.appPublic,
      publicPath: [AppConfig.publicPath],
      watch: true,
    },
    client: {
      overlay: { errors: true, warnings: false },
    },
    devMiddleware: { publicPath: AppConfig.publicPath.slice(0, -1) },
    https: false,
    host: "0.0.0.0",
    historyApiFallback: true,
    proxy: AppConfig.proxy,
    port: AppConfig.port,
    ...AppConfig.devServer,
  },
  compiler
);

devServer.startCallback(() => {
  if (process.stdout.isTTY) {
    clearConsole();
  }
});

["SIGINT", "SIGTERM"].forEach(function (sig) {
  process.on(sig, function () {
    devServer.close();
    process.exit();
  });
});

process.stdin.on("end", function () {
  devServer.close();
  process.exit();
});

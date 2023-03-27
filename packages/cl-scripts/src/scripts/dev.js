"use strict";
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const webpack = require("webpack");
const appPaths = require("../config/app_path");
const checkRequiredFiles = require("../utils/check_file");
const AppConfig = require("../config/app_config");
const getBaseConfig = require("../config/webpack.base");
const WebpackDevServer = require("webpack-dev-server");
const chalk = require("chalk");
const address = require("address");

process.on("unhandledRejection", (err) => {
  throw err;
});

console.log(chalk.blue(`${process.env.NODE_ENV}开始编译……`));
console.log(`通过${chalk.bold("Ctrol+C")}可终止`);

if (!checkRequiredFiles(Object.values(AppConfig.entry))) {
  process.exit(1);
}

const baseConfig = getBaseConfig(process.env.NODE_ENV); // 获得基本配置
const compiler = webpack(baseConfig);
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
      // publicPath: [AppConfig.publicPath],
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

// 启动
devServer.start();
compiler.hooks.failed.tap("failed", async (stats) => {
  console.log(chalk.red("❌ Failed to compile（编译失败）."));
  process.exit();
});

compiler.hooks.invalid.tap("invalid", () => {
  console.log("Compiling(重新编译中)...");
});

let isFirstCompiler = true;
compiler.hooks.done.tap("done", () => {
  if (isFirstCompiler) {
    console.log(`访问地址:${chalk.blue(`http://localhost:${AppConfig.port}/`)}`);
    try {
      const localIp = address.ip();
      console.log(`或者IP地址:${chalk.blue(`http://${localIp}:${AppConfig.port}/`)}`);
    } catch (error) {
      console.log("获取本地IP失败，尝试localhost访问");
    }
  }
  isFirstCompiler = false;
});

// 随时中断
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

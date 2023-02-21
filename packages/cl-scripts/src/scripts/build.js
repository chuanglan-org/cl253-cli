"use strict";

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

const appPaths = require("../config/app_path");
const AppConfig = require("../config/app_config");
const getBaseConfig = require("../config/webpack.base");
const fse = require("fs-extra");
const chalk = require("chalk");
const webpack = require("webpack");
const ora = require("ora");

process.on("unhandledRejection", (err) => {
  throw err;
});
/* ========== 构建过程 ========== */
const buildProcess = () => {
  const config = getBaseConfig(process.env.NODE_ENV);
  // 创建dist目录
  fse.emptyDirSync(AppConfig.buildDir);
  // 复制public到dist
  fse.copySync(appPaths.appPublic, AppConfig.buildDir, {
    dereference: true,
    filter: (file) => file !== appPaths.appHtml,
  });

  const compiler = webpack(config);
  compiler.run((err, stats) => {
    if (err) {
      console.log(chalk.red("构建失败"));
      console.log(err);
      process.exit(1);
    }
  });
};

buildProcess();

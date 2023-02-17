"use strict";
const path = require("path");
const appPaths = require("../config/app_path");
const { checkRequiredFiles } = require("../config/utils");
const AppConfig = require("../config/app_config");
const baseConfig = require("../config/webpack.base");

process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

/* ========== 检查入口文件是否存在 ========== */
const needCheckFile = () => {
  return Object.keys(AppConfig.entry).map((item) => {
    return path.join(appPaths.appRoot, AppConfig.entry[item]);
  });
};
if (!checkRequiredFiles(needCheckFile())) {
  process.exit(1);
}

console.log(baseConfig(process.env.NODE_ENV));

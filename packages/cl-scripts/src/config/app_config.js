"use strict";
const fse = require("fs-extra");
const appPaths = require("../config/app_path");

const { log } = console;
const chalk = require("chalk");

let appConfig = {};

if (fse.existsSync(appPaths.appConfig)) {
  try {
    appConfig = require(appPaths.appConfig);
  } catch (error) {
    log(chalk.error(`${appPaths.appConfig}文件格式需要commonjs类型，如module.exports={}`));
  }
}

const appPackageJson = require(appPaths.appPackageJson);

module.exports = {
  title: appPackageJson.name || "react App",
  sourceMap: true,
  entry: {
    main: "src/main.js",
  },
  ...appConfig,
};

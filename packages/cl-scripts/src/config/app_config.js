"use strict";
const fse = require("fs-extra");
const appPaths = require("./app_path");

const { log } = console;
const chalk = require("chalk");

let appConfig = {};

if (fse.existsSync(appPaths.appConfig)) {
  try {
    appConfig = require(appPaths.appConfig);
  } catch (error) {
    log(chalk.error(`${appPaths.appConfig}文件格式需要commonjs类型，如module.exports={}`));
  }
} else {
  log(chalk.error("app.config.js不存在"));
}

const appPackageJson = require(appPaths.appPackageJson);
/* ========== 设置别名 ========== */
const setAlias = (_alias) => {
  try {
    const obj = {};
    Object.keys(_alias).forEach((item) => {
      obj[item] = appPaths.resolveApp(_alias[item]);
    });
    return obj;
  } catch (error) {
    console.log(error);
    console.log(chalk.red("app.config.js的modulesAlias设置出错"));
    return {};
  }
};

// 获得入口文件
const getEntry = (_entry) => {
  try {
    const obj = {};
    Object.keys(_entry).forEach((item) => {
      obj[item] = appPaths.resolveApp(_entry[item]);
    });
    return obj;
  } catch (error) {
    console.log(error);
    console.log(chalk.red("app.config.js的entry设置出错"));
    return {};
  }
};

// 配置说明 https://github.com/chuanglan-org/cl253-cli/blob/master/docs/appConfig.md
module.exports = {
  title: appPackageJson.name || "react App",
  port: appConfig.port || 8080,
  devOpen: appConfig.devOpen !== undefined ? appConfig.devOpen : true,
  proxy: appConfig.proxy || {},
  sourceMap: appConfig.sourceMap !== undefined ? appConfig.sourceMap : true,
  buildDir: appPaths.resolveApp(appConfig.buildDir || "dist"),
  Analyze: appConfig.Analyze !== undefined ? appConfig.Analyze : true,
  buildZip: appConfig.buildZip !== undefined ? appConfig.buildZip : false,
  entry: getEntry({
    main: "src/main.js",
    ...(appConfig.entry || {}),
  }),
  publicPath: appConfig.publicPath || "/",
  extensions: appConfig.extensions || [".js", ".jsx", ".ts", ".tsx", ".less", ".json"],
  modulesAlias: setAlias({
    "@": "src",
    components: "src/components",
    pages: "src/pages",
    assets: "src/assets",
    ...(appConfig.modulesAlias || {}),
  }),
  styleType: appConfig.styleType || ["less"],
  env: appConfig.env || {},
  plugins: appConfig.plugins || [],
  devServer: appConfig.devServer || {},
  webpackConfig: appConfig.webpackConfig || null,
};

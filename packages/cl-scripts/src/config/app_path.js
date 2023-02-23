"use strict";
const path = require("path");
const fs = require("fs-extra");

const appDirectory = fs.realpathSync(process.cwd()); // 当前项目的根路径
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  resolveApp,
  appRoot: resolveApp("."),
  appConfig: resolveApp("app.config.js"),
  appPublic: resolveApp("public"),
  appHtml: resolveApp("public/index.html"),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("src"),
  appNodeModules: resolveApp("node_modules"),
  appTsConfig: resolveApp("tsconfig.json"),
  appJsConfig: resolveApp("jsconfig.json"),
};

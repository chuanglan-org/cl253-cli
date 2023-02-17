"use strict";
const path = require("path");
const fs = require("fs-extra");

const appDirectory = fs.realpathSync(process.cwd()); // 当前项目的根路径
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  appRoot: resolveApp("."),
  appConfig: resolveApp("app.config.js"),
  appPublic: resolveApp("public"),
  appHtml: resolveApp("public/index.html"),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("src"),
  // dotenv: resolveApp(".env"),
  // appPath: resolveApp("."),
  // appBuild: resolveApp(buildPath),
  // appIndexJs: resolveModule(resolveApp, "src/index"),
  // appPackageJson: resolveApp("package.json"),
  // appSrc: resolveApp("src"),
  // appTsConfig: resolveApp("tsconfig.json"),
  // appJsConfig: resolveApp("jsconfig.json"),
  // yarnLockFile: resolveApp("yarn.lock"),
  // testsSetup: resolveModule(resolveApp, "src/setupTests"),
  // proxySetup: resolveApp("src/setupProxy.js"),
  // appNodeModules: resolveApp("node_modules"),
  // appWebpackCache: resolveApp("node_modules/.cache"),
  // appTsBuildInfoFile: resolveApp("node_modules/.cache/tsconfig.tsbuildinfo"),
  // swSrc: resolveModule(resolveApp, "src/service-worker"),
  // publicUrlOrPath,
};

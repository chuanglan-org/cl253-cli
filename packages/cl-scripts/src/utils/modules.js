"use strict";
const chalk = require("chalk");
const fse = require("fs-extra");
const appPaths = require("../config/app_path");
/* ========== 获得 jsconfig.json或者tsconfig.json 里的别名 ========== */
const getModulesAlias = (options) => {
  if (options.paths) {
    return {};
  } else {
    try {
      const obj = {};
      Object.keys(options.paths).forEach((item) => {
        const key = item.replace(/\/\*$/, "");
        const value = options.paths[item][0].replace.replace(/\/\*$/, "");
        obj[key] = appPaths.resolveApp(value);
      });
      return obj;
    } catch (error) {
      console.log(error);
      console.log(chalk.red("jsconfig.json或者tsconfig.json 里的别名格式错误，请检查path值"));
      process.exit(1);
    }
  }
};

module.exports = () => {
  const hasTsConfig = fse.existsSync(appPaths.appTsConfig);
  const hasJsConfig = fse.existsSync(appPaths.appJsConfig);
  if (hasTsConfig && hasJsConfig) {
    console.log(chalk.red("tsconfig.json 和  jsconfig.json两个文件只能保留一个"));
    process.exit(1);
  }

  let config = {};
  if (hasTsConfig) {
    config = require(appPaths.appJsConfig);
  } else if (hasJsConfig) {
    config = require(appPaths.appJsConfig);
  }
  const options = config.compilerOptions || {};

  return {
    modulesAlias: getModulesAlias(options),
  };
};

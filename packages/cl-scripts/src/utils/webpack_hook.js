"use strict";
const webpack = require("webpack");
const chalk = require("chalk");
const address = require("address");
const clearConsole = require("./clear_console");
const formatWebpackMessages = require("./format_message");
const appPaths = require("../config/app_path");
const appConfig = require("../config/app_config");

const appPackageJson = require(appPaths.appPackageJson);

const isInteractive = process.stdout.isTTY; // 判断是否在终端上下文中运行
const createCompiler = (config) => {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (err) {
    console.log(chalk.red("Failed to compile（编译失败）."));
    console.log();
    console.log(err.message || err);
    console.log();
    process.exit(1);
  }

  /* ========== 如果警告时 ========== */
  compiler.hooks.invalid.tap("invalid", () => {
    if (isInteractive) {
      clearConsole();
    }
    console.log("Compiling(编译中)...");
  });

  let isFirstCompile = true;

  /* ========== 如果完成时 ========== */
  compiler.hooks.done.tap("done", async (stats) => {
    if (isInteractive) {
      clearConsole();
    }
    // 重置警告信息
    const statsData = stats.toJson({
      all: false,
      warnings: true,
      errors: true,
    });

    const messages = formatWebpackMessages(statsData);
    const isSuccessful = !messages.errors.length && !messages.warnings.length;
    if (isSuccessful) {
      console.log(chalk.green("Compiled successfully(编译完成)!"));
    }
    if (isSuccessful && (isInteractive || isFirstCompile)) {
      console.log();
      console.log(`你现在可以在浏览器中查看${chalk.blue.bold(appPackageJson.name)}项目了`);
      console.log(`地址:${chalk.blue(`http://localhost:${appConfig.port}/`)}`);
      try {
        const localIp = address.ip();
        console.log(`或者IP地址:${chalk.blue(`http://${localIp}:${appConfig.port}/`)}`);
      } catch (error) {
        console.log("获取本地IP，尝试localhost访问");
      }
    }
    isFirstCompile = false;

    if (messages.errors.length) {
      if (messages.errors.length > 1) {
        messages.errors.length = 1;
      }
      console.log(chalk.red("Failed to compile（编译失败）.\n"));
      console.log(messages.errors.join("\n\n"));
      return;
    }
    if (messages.warnings.length) {
      console.log(chalk.yellow("Compiled with warnings（编译警告）.\n"));
      console.log(messages.warnings.join("\n\n"));
    }
  });
  return compiler;
};

module.exports = {
  createCompiler,
};

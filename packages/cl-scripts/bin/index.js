#!/usr/bin/env node
"use strict";
const chalk = require("chalk");
const spawn = require("cross-spawn");

const args = process.argv.slice(2);
const scriptIndex = args.findIndex((x) => x === "dev" || x === "build"); // 找到命令行的索引
const scriptArr = ["dev", "build"];

const commandScript = scriptIndex === -1 ? args[0] : args[scriptIndex]; // 命令
const paramsArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : []; // 命令行的参数
const { log } = console;

if (scriptArr.includes(commandScript)) {
  const commandArr = [
    ...paramsArgs,
    require.resolve(`../src/scripts/${commandScript}`),
    ...args.slice(scriptIndex + 1),
  ];
  const result = spawn.sync(process.execPath, commandArr, { stdio: "inherit" });
  if (result.signal) {
    log(chalk.yellow("进程处理失败"));
    process.exit(1);
  }
  process.exit(result.status);
} else {
  log(chalk.red(`命令不对，目前只支持${scriptArr.join(",")}`));
  log(chalk.red("如：cl-scripts dev"));
}

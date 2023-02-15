#!/usr/bin/env node
"use strict";
const chalk = require("chalk");

const currentNodeVersion = process.versions.node;
const major = currentNodeVersion.split(".")[0];
const isuseYarn = (process.env.npm_config_user_agent || "").indexOf("yarn") === 0;

if (major < 16) {
  console.error(
    chalk.blue(`你当前运行的node版本为： ${chalk.red.bold(currentNodeVersion)}.\n脚手架建议16+，请升级你的node版本`)
  );
  process.exit(1);
}

if (isuseYarn) {
  console.error(chalk.yellow("脚手架对yarn支持不是很好，不建议使用"));
  process.exit(1);
}

const { init } = require("../src/int");

init();

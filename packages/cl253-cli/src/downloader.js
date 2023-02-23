"use strict";
const axios = require("axios");
const chalk = require("chalk");
const ora = require("ora");
const os = require("os");
const path = require("path");
const fse = require("fs-extra");
const download = require("download");

const { log } = console;
// const downVesion="master";
const downVesion = "2.0.0";
/* ========== 下载模板资源 ========== */
const downTempFile = ({ gitData, rootDir, projectParams }) => {
  const spinner = ora("准备下载模板文件").start();
  const tempdir = `packages/template/zip/${projectParams.app_temp}.zip`;
  const downloadPath = path.join(rootDir, "__download__"); // 模板存放临时目录
  const exportUrl = path.join(downloadPath, `${projectParams.app_temp}.zip`);
  return new Promise((resolve, reject) => {
    download(`https://github.com/chuanglan-org/cl253-cli/raw/${downVesion}/${tempdir}`)
      .then((data) => {
        spinner.text = "模板下载完成，准备写入";
        fse.writeFileSync(exportUrl, data);
        process.exit(1);
        resolve();
      })
      .catch((err) => {
        log("下载报错信息：", err);
        reject();
      });
  });
};

/* ========== 配置参数 ========== */
const editTemp = ({ rootDir, projectParams }) => {
  const downloadPath = path.join(rootDir, "__download__"); // 模板存放临时目录
  const spinner = ora("配置package.json文件").start();
  try {
    const package_file = path.join(downloadPath, "package.json");
    let package_content = JSON.parse(fse.readFileSync(package_file, "utf8"));
    package_content = { ...package_content, name: projectParams.app_name, description: projectParams.app_desc };
    package_content.dependencies["react-scripts"] = "^2";
    fse.writeFileSync(package_file, JSON.stringify(package_content, null, 2) + os.EOL);
  } catch (error) {
    spinner.fail(chalk.red("配置package.json失败"));
    log("\n");
    log(error);
    process.exit(1);
  }
  fse.copySync(downloadPath, rootDir);
  fse.removeSync(downloadPath);
  spinner.succeed(chalk.green("全部配置完成！"));
};

module.exports = {
  downTempFile,
  editTemp,
};

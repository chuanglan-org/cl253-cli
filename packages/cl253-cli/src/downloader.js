"use strict";
const axios = require("axios");
const chalk = require("chalk");
const ora = require("ora");
const os = require("os");
const path = require("path");
const fse = require("fs-extra");
const download = require("download");

const { log } = console;
/* ========== 获取模板资源 ========== */
const getTempFile = ({ tempName }) => {
  return new Promise((resolve, reject) => {
    const spinner = ora(`准备远程拉取${chalk.blue.bold(tempName)}模板资源`).start();
    axios
      .get("https://api.github.com/repos/chuanglan-org/cl253-cli/git/trees/master?recursive=1")
      .then((res) => {
        spinner.succeed(chalk.green("数据拉取成功！"));
        resolve(res.data?.tree);
      })
      .catch((err) => {
        spinner.fail(chalk.red("拉取资源失败!"));
        process.exit();
      });
  });
};
/* ========== 下载模板资源 ========== */
const downTempFile = ({ gitData, rootDir, projectParams }) => {
  const spinner = ora("准备下载模板文件").start();
  const tempdir = `packages/template/${projectParams.app_temp}`;
  const filterList = gitData.filter((item) => {
    return item.type === "blob" && item.path.indexOf(tempdir) !== -1;
  });
  if (filterList.length === 0) {
    log(chalk.red("下载的模板为空！"));
    process.exit(1);
  }
  const downloadPath = path.join(rootDir, "__download__"); // 模板存放临时目录
  fse.ensureDirSync(downloadPath);
  const promiseArr = filterList.map((ele) => {
    const currentDir = ele.path.replace(`${tempdir}/`, "");
    const exportUrl = path.join(downloadPath, currentDir);
    return new Promise((resolve, reject) => {
      spinner.text = `准备下载${currentDir}`;
      download(`https://github.com/chuanglan-org/cl253-cli/raw/master/${ele.path}`)
        .then((data) => {
          spinner.text = `${currentDir}下载完成，准备写入`;
          fse.writeFileSync(exportUrl, data);
          spinner.text = "从github下载速度有些慢，耐心等待...";
          resolve();
        })
        .catch((err) => {
          log("下载报错信息：", err);
          reject();
        });
    });
  });

  return new Promise((resolve, reject) => {
    Promise.all(promiseArr)
      .then((res) => {
        spinner.succeed(chalk.green("资源下载成功"));
        resolve();
      })
      .catch((err) => {
        spinner.fail(chalk.red("资源下载失败"));
        reject();
        process.exit(1);
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
    fse.writeFileSync(package_file, JSON.stringify(package_content, null, 2) + os.EOL);
    spinner.succeed("配置package.json完成");
  } catch (error) {
    console.log(error);
    spinner.fail("配置package.json失败");
    process.exit(1);
  }
};

module.exports = {
  getTempFile,
  downTempFile,
  editTemp,
};

"use strict";
const chalk = require("chalk");
const ora = require("ora");
const os = require("os");
const path = require("path");
const fse = require("fs-extra");
const { execSync } = require("child_process");

const clPackageJson = require("../package.json"); // 脚手架的json数据

const VersionMax = clPackageJson.version.split(".")[0];

const { log } = console;

/* ========== 下载模板资源 ========== */
const downTempFile = ({ gitData, rootDir, projectParams }) => {
  const spinner = ora("准备下载模板文件").start();
  const downloadPath = path.join(rootDir, "__download__"); // 模板下载临时目录
  const tempPath = path.join(rootDir, "__temp__"); // 模板存放临时目录
  fse.ensureDirSync(downloadPath);
  fse.ensureDirSync(downloadPath);
  const packageJson = {
    name: projectParams.app_name,
    private: true,
  };
  fse.writeFileSync(path.join(downloadPath, "package.json"), JSON.stringify(packageJson, null, 2) + os.EOL);
  try {
    spinner.text = "安装模板文件";
    const result = execSync(
      `npm i cl253-cli_template@^${VersionMax}`,
      { cwd: downloadPath },
      function (error, stdout, stderr) {
        console.log(error, stdout, stderr);
        if (error) {
          log(error);
          spinner.fail(chalk.red("安装模板失败"));
          process.exit(1);
        }
      }
    ); // 创建虚拟的目录环境
    if (result) {
      fse.copySync(path.join(downloadPath, `node_modules/cl253-cli_template/${projectParams.app_temp}`), tempPath, {
        overwrite: true,
      });
      fse.removeSync(downloadPath);
      spinner.succeed(chalk.green("模板文件按照成功！"));
    }
  } catch (error) {
    spinner.fail(chalk.red("安装模板失败"));
    log(error);
    fse.removeSync(downloadPath);
    process.exit(1);
  }
};

/* ========== 配置参数 ========== */
const editTemp = ({ rootDir, projectParams }) => {
  const tempPath = path.join(rootDir, "__temp__"); // 模板存放临时目录
  const spinner = ora("准备重写配置文件").start();
  // 重写package.json
  try {
    spinner.text = "重写依赖包package.json";
    const package_file = path.join(tempPath, "package.json");
    let package_content = JSON.parse(fse.readFileSync(package_file, "utf8"));
    package_content = { ...package_content, name: projectParams.app_name, description: projectParams.app_desc };
    package_content.dependencies["cl-scripts"] = `^${VersionMax}`;
    fse.writeFileSync(package_file, JSON.stringify(package_content, null, 2) + os.EOL);
  } catch (error) {
    spinner.fail(chalk.red("配置package.json失败"));
    log("\n");
    log(error);
    fse.removeSync(tempPath);
    process.exit(1);
  }

  // 重写gitignore
  try {
    spinner.text = "重写.gitignore文件";
    const gitignore_file = path.join(tempPath, ".gitignore");
    fse.renameSync(path.join(tempPath, "gitignore.txt"), gitignore_file);
  } catch (error) {
    spinner.fail(chalk.red("配置.gitignore文件失败"));
    log("\n");
    log(error);
    fse.removeSync(tempPath);
    process.exit(1);
  }
  fse.copySync(tempPath, rootDir);
  fse.removeSync(tempPath);
  spinner.succeed(chalk.green("全部配置完成！"));
};

module.exports = {
  downTempFile,
  editTemp,
};

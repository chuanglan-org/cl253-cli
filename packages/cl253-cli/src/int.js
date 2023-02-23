"use strict";
const chalk = require("chalk");
const { Command } = require("commander");
const fse = require("fs-extra");
const path = require("path");
const packageJson = require("../package.json");
const ora = require("ora");

const { getProjectDir, checkTemp, setProjectParams, tempList, clearConsole } = require("../src/utils");
const { downTempFile, editTemp } = require("./downloader");

const { log } = console;

/* ========== 创建项目和模板文件========== */
const creatProject = async (dirname, { temp }) => {
  if (temp) {
    // 如果命令里存在模板类型，检查模板
    checkTemp(temp);
  }
  const projectDir = await getProjectDir(dirname); // 文件夹名称，为空表示当前
  const rootDir = path.resolve(projectDir); // 项目文件夹路径
  const appName = path.basename(rootDir); // 项目的初始化的名称===文件夹名称
  const projectParams = await setProjectParams({ appName, temp }); // 设置一些初始值
  const tempName = tempList.filter((item) => item.value === projectParams.app_temp)[0]?.name;

  log(`准备在${chalk.green(rootDir)}路径下创建${chalk.blue.bold(`<${tempName}>`)}`);
  if (projectDir) {
    const spinner = ora("创建项目文件夹").start();
    fse.ensureDirSync(projectDir); // 项目文件夹建好
    spinner.succeed(chalk.green("项目文件夹创建成功"));
  }

  // 下载资源
  await downTempFile({ rootDir, projectParams });
  // 配置信息，把模板里的内容进行参数配置
  await editTemp({ rootDir, projectParams });
  clearConsole();
  log(chalk.blue("项目已经创建完成，按照以下命令开始开发："));
  if (projectDir) {
    log(chalk.green.bold(`cd ${projectDir}`));
  }
  log(chalk.green("npm install 或者 yarn install"));
  log(chalk.green("npm run dev (本地开发)"));
};

/* ========== 初始化项目 ========== */
const init = () => {
  const program = new Command();
  program
    .name(packageJson.name)
    .description(chalk.blue("命令示例：cl253-cli myapp"))
    .version(packageJson.version, "-V, --version", chalk.dim("脚手架当前版本"))
    .helpOption("-H, --help", chalk.dim("帮助信息"))
    .showHelpAfterError(chalk.red(`命令格式错误，通过命令"${chalk.green("cl253-cli -H")}"查看帮助信息`));
  let tempOptMsg = "从下列项目类型中选择一个: \n";
  tempList.forEach((item) => {
    tempOptMsg += `${chalk.blue(item.value)} ${item.name} \n`;
  });
  program
    .arguments("[project-directory]", "项目目录的名称")
    .option("-T, --temp <template>'", chalk.dim(tempOptMsg))
    .action(creatProject);
  program.parse(process.argv);
};
module.exports = { init };

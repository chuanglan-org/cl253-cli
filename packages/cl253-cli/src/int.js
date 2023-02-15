"use strict";
const chalk = require("chalk");
const { Command } = require("commander");
const fse = require("fs-extra");
const path = require("path");
const packageJson = require("../package.json");
const { getProjectDir, checkTemp, setProjectParams, tempList } = require("../src/utils");

const { log } = console;

/* ========== 创建项目和模板文件========== */
const creatProject = async (dirname, { temp }) => {
  if (temp) {
    // 如果命令里存在模板类型，检查模板
    checkTemp(temp);
  }
  const dir = await getProjectDir(dirname);
  const root = path.resolve(dir); // 项目文件夹
  const appName = path.basename(root); // 初期的项目名称
  const projectParams = await setProjectParams({ appName, temp });
  const tempName = tempList.filter((item) => item.value === projectParams.app_temp)[0]?.name;
  log();
  log(`准备在${chalk.green(root)}路径下创建${chalk.blue.bold(`<${tempName}>`)}`);
  log();
  if (dir) {
    fse.ensureDirSync(dir); // 项目文件夹建好
  }
};

/* ========== 初始化项目 ========== */
const init = () => {
  const program = new Command();
  program
    .name(packageJson.name)
    .description(chalk.blue("命令示例：cl253-cli myapp"))
    .version(packageJson.version, "-V, --version", chalk.dim("脚手架当前版本"))
    .helpOption("-H, --help", chalk.dim("帮助信息"))
    .showHelpAfterError(chalk.red(`格式错误，通过命令"${chalk.green("cl253-cli -H")}"查看帮助信息`));
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

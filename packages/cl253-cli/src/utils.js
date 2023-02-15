const inquirer = require("inquirer");
const fse = require("fs-extra");
const validFilename = require("valid-filename");
const chalk = require("chalk");

const { log } = console;
/* ========== 创建项目目录 ========== */
function createProjectDir(msg) {
  return new Promise((resolve) => {
    const prompts = [
      {
        type: "input",
        name: "projectDir",
        message: msg,
        validate(value) {
          if (!value) {
            return chalk.red("❌ 文件夹名称不能为空");
          } else if (!validFilename(value)) {
            return chalk.red("❌ 不支持该文件夹格式，请重新命名");
          } else if (/[\u4e00-\u9fa5]/g.test(value)) {
            return chalk.red("❗️ 不建议用中文名命名");
          } else if (fse.existsSync(value)) {
            return chalk.red("❌ 当前目录已存在同名文件夹，请重新命名");
          }
          return true;
        },
      },
    ];
    inquirer.prompt(prompts).then(({ projectDir }) => {
      resolve(projectDir);
    });
  });
}

/* ========== 检查项目目录是否创建 ========== */
const getProjectDir = (directory) => {
  return new Promise((resolve, reject) => {
    if (directory) {
      // 如果命名了项目文件夹,检查文件夹是否存在
      if (fse.existsSync(directory)) {
        log(chalk.red("❌ 当前目录已存在同名文件夹，请重新命名"));
        process.exit(1);
      } else {
        resolve(directory);
      }
    } else {
      // 如果没有命名，询问是否在当前下创建
      const prompts = [
        {
          type: "confirm",
          name: "dir",
          message: "确定在当前文件目录下建立项目吗？",
          default: true,
        },
      ];
      inquirer.prompt(prompts).then(async (answer) => {
        if (answer.dir) {
          // 如果是当前目录,检查文件夹中是否有其他资源
          const currentDir = process.cwd();
          const allfiles = fse.readdirSync(currentDir);
          if (allfiles.length > 0) {
            log(
              `❌ ${chalk.red(`当前目录有其他文件，不建议在当前目录。可以尝试：${chalk.green("cl253-cli 目录名")} `)}`
            );
            process.exit(1);
          } else {
            resolve("");
          }
        } else {
          // 如果不是，要求创建文件夹
          const dir = await createProjectDir("请输入项目文件夹名称");
          resolve(dir);
        }
      });
    }
  });
};

/* ========== 检查模板名称是否正确 ========== */
const checkTemp = (temp_name) => {
  const originTemp = ["spa", "sspa-main", "sspa-app"];
  if (!originTemp.includes(temp_name)) {
    log(chalk.red(`不存在模板类型${chalk.bold(temp_name)},请查看帮助信息`));
    process.exit(1);
  }
};

/* ========== 模板类型 ========== */
const tempList = [
  { name: "独立react单页面项目", value: "spa" },
  { name: "微前端-main主工程项目", value: "sspa-main" },
  { name: "微前端-react微应用", value: "sspa-app" },
];

/* ========== 设置项目的参数 ========== */
const setProjectParams = ({ appName, temp }) => {
  const prompts = [
    {
      type: "input",
      name: "app_name",
      message: "你的项目名称叫什么?",
      default: appName,
      validate(value) {
        if (!value) {
          return chalk.red("❌ 项目名称不能为空");
        } else if (!validFilename(value)) {
          return chalk.red("❌ 不支持该格式，请重新命名");
        } else if (/[\u4e00-\u9fa5]/g.test(value)) {
          return chalk.red("❗️ 不建议用中文名命名");
        }
        return true;
      },
    },
    {
      type: "input",
      name: "app_desc",
      message: "项目描述?",
      default: "This is my a react App",
    },
  ];
  if (!temp) {
    prompts.push({
      type: "list",
      name: "app_temp",
      message: "选择你要创建的项目类型",
      default: "spa",
      choices: tempList,
    });
  }
  return new Promise((resolve, reject) => {
    // 选型开始
    inquirer.prompt(prompts).then((answer) => {
      resolve({ app_temp: temp, ...answer });
    });
  });
};

module.exports = {
  getProjectDir,
  checkTemp,
  setProjectParams,
  tempList,
};

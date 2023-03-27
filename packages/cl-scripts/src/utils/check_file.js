const fse = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
/* ========== 检查必须存在的文件 ========== */
const checkRequiredFiles = (files) => {
  let has;
  files.forEach((filePath) => {
    if (!fse.existsSync(filePath)) {
      has = filePath;
    }
  });
  if (has) {
    const dirName = path.dirname(has);
    const fileName = path.basename(has);
    console.log(chalk.red(`${chalk.cyan(dirName)}路径下缺少文件${chalk.cyan(fileName)}`));
    return false;
  } else {
    return true;
  }
};

module.exports = checkRequiredFiles;

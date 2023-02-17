const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
/* ========== 检查必须存在的文件 ========== */
const checkRequiredFiles = (files) => {
  let currentFilePath;
  try {
    files.forEach((filePath) => {
      currentFilePath = filePath;
      fs.accessSync(filePath, fs.F_OK);
    });
    return true;
  } catch (err) {
    const dirName = path.dirname(currentFilePath);
    const fileName = path.basename(currentFilePath);
    console.log(chalk.red(`${chalk.cyan(dirName)}路径下缺少文件${chalk.cyan(fileName)}`));
    return false;
  }
};

module.exports = checkRequiredFiles;

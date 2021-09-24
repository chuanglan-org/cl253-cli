const path = require('path');
const fse = require('fs-extra');

const packages = require(path.resolve(__dirname, '../package.json'));
exports.version=packages.version; //项目版本号

/* ========== 得到需要copy文件 ========== */
exports.getDirFileName=(dir)=>{
  try {
    const files = fse.readdirSync(dir);
    const filesToCopy = [];
    const injectFiles=['package.json','app.config.js']; //这两需求排除的文件
    files.forEach((file) => {
      if (file.indexOf(injectFiles) > -1) return;
      filesToCopy.push(file);
    });
    return filesToCopy;
  } catch (e) {
    console.error(e)
    return [];
  }
}

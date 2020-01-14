const path = require('path');
const chalk = require('chalk');
const packages = require(path.resolve(__dirname, '../package.json'));
const fse = require('fs-extra');
//获得脚手架版本
function getPackageVersion() {
  return packages.version;
}

exports.getPackageVersion = getPackageVersion;

function getDirFileName(dir) {
  try {
    const files = fse.readdirSync(dir);
    const filesToCopy = [];
    const injectFiles=['package.json','app.config.js'];
    files.forEach((file) => {
      if (file.indexOf(injectFiles) > -1) return;
      filesToCopy.push(file);
    });
    return filesToCopy;
  } catch (e) {
    return [];
  }
}

exports.getDirFileName = getDirFileName;

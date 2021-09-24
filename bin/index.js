#! /usr/bin/env node
const { program } = require('commander');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const {version} = require('../src/utils');
const Project = require('../src/project');

/* ========== 创建新项目 ========== */
function creactProject(projectName){
  const project = new Project({projectName});
  project.create();
};

/* ========== 创建项目目录 ========== */
function setProjectName(msg) {
  let prompts = [];
  prompts.push({
    type: 'input',
    name: 'projectName',
    message: msg,
    validate(value) {
      if (!value) {
        return '文件夹名称不能为空';
      }
      if (fse.existsSync(value)) {
        return '当前目录已存在同名文件夹，请重新命名';
      }
      return true;
    }
  });
  inquirer.prompt(prompts).then(answer => {
    creactProject(answer.projectName);
  });
}

program
  .version(version, '-v, --version', '当前版本')
  .command('init [dirname]')
  .description('创建新应用')
  .action(dirname => {
    if (dirname && fse.existsSync(dirname)) {
      setProjectName("当前目录已存在同名文件夹，请重新命名")
    } else if (dirname) {
      creactProject(dirname);
    } else {
      let prompts = [
        {
          type: 'confirm',
          name: 'empty',
          message: '确定在当前文件目录下建立项目吗？',
          default: true
        }
      ];
      inquirer.prompt(prompts).then(answer => {
        if (answer.empty) {//如果是当前目录
          creactProject("");
        } else {
          setProjectName("请输入你的文件夹名称")
        }
      });
    }
  });


program.parse(process.argv);
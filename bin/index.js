#! /usr/bin/env node
const program = require('commander');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const Project = require('../src/project');
const {getPackageVersion} = require('../src/utils');
const creactProject = (projectName) => {
  const project = new Project({projectName});
  project.create();
};

function setProjectName(msg) {
  let prompts = [];
  prompts.push({
    type: 'input',
    name: 'projectName',
    message: msg,
    validate(value) {
      if (!value) {
        return '项目名不能为空';
      }
      if (fse.existsSync(value)) {
        return '当前目录已存在同名项目，请更换项目名';
      }
      return true;
    }
  });
  inquirer.prompt(prompts).then(answer => {
    creactProject(answer.projectName);
  });
}

program
  .version(getPackageVersion(), '-v, --version', '当前版本')
  .command('init [dirname]')
  .description('创建新引用')
  .action(dirname => {
    if (dirname && fse.existsSync(dirname)) {
      setProjectName('当前目录已存在同名项目，请更换项目名')
    } else if (dirname) {
      creactProject(dirname);
    } else {
      let prompts = [
        {
          type: 'confirm',
          name: 'empty',
          message: '确定在当前目录下建立项目吗？',
          default: false
        }
      ];
      inquirer.prompt(prompts).then(answer => {
        if (answer.empty) {//如果是当前目录
          creactProject(dirname);
        } else {
          setProjectName('请输入目录名称')
        }
      });
    }
  });
program.parse(process.argv);



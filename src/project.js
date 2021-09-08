const inquirer = require('inquirer');
const path = require("path");
const ora = require('ora');
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');
const download = require('download-git-repo');
const fse = require('fs-extra');
const chalk = require('chalk');
const {getDirFileName} = require('./utils');

function project(opt) {
  this.options = Object.assign({
    projectName: ''
  }, opt);
  const store = memFs.create();
  this.memFsEditor = editor.create(store);
}

/* 项目初始化 */
/* ================================================== */
project.prototype.create = function () {
  let __this = this;
  let questions = [
    {
      type: 'input',
      name: 'appName',
      message: "您的项目名称是什么？",
      validate: function (value) {
        let pass = value.match(/^[a-zA-Z_\-]+$/);
        if (pass) {
          return true;
        }
        return '项目名称最好是英文，下划线或者-';
      },
      default: 'App'
    },
    {
      type: 'input',
      name: 'description',
      message: '项目描述?',
      default: 'a react App'
    },
    {
      type: 'list',
      name: 'appType',
      message: '选择你要创建的项目类型',
      choices: [
        {name: '创蓝智能云微应用', value: 1},
        {name: '独立react项目', value: 2}
      ],
    },
  ];
  inquirer.prompt(questions).then(answers => {
    __this.options = Object.assign(__this.options, answers);
    __this.generate();
  });
};

/* 渲染项目 */
/* ================================================== */
project.prototype.generate = function () {
  const __this = this;
  const projectPath = path.join(process.cwd(), this.options.projectName);//新项目绝对路径
  const downloadPath = path.join(projectPath, '__download__');//模板copy临时目录
  const downloadSpinner = ora('正在下载模板，请稍等...');
  downloadSpinner.start();
  /*开始下载模板*/
  const gitRepositories = this.options.appType === 1 ? 'direct:https://github.com/chuanglan-org/cl253-cli-sspa.git' : 'direct:https://github.com/chuanglan-org/cl253-cli-spa.git';
  download(gitRepositories, downloadPath, {clone: true}, (err) => {
    if (err) {
      downloadSpinner.color = 'red';
      downloadSpinner.fail(err.message);
      return;
    }
    downloadSpinner.color = 'green';
    downloadSpinner.succeed('下载模板成功');
    const filesSpinner = ora('开始创建项目文件，请稍等...');
    const copyFiles = getDirFileName(downloadPath);
    const injectFiles = ['package.json', 'app.config.js'];

    /* 复制文件 */
    copyFiles.forEach((file) => {
      fse.copySync(path.join(downloadPath, file), path.join(projectPath, file));
    });

    /* 写入变量 */
    injectFiles.forEach((file) => {
      this.memFsEditor.copyTpl(path.join(downloadPath, file), path.join(this.options.projectName, file), {
        appName: __this.options.appName,
        description: __this.options.description
      });
    });

    /* 变量写入完成后 */
    this.memFsEditor.commit(() => {
      fse.remove(downloadPath);//移除临时文件
      process.chdir(projectPath);//cd 到项目文件夹目录
      downloadSpinner.color = 'green';
      downloadSpinner.succeed('项目创建完成');
      console.log(chalk.blue('按照以下命令开始开发：'));
      if(this.options.projectName){
        console.log(chalk.green(`cd ${this.options.projectName}`));
      }
      console.log(chalk.green(`npm install 或者 yarn install`));
      if(this.options.appType===2){
        console.log(chalk.green(`npm run dev (本地开发)`));
      }else{
        console.log(chalk.green(`npm run dev (需要引入智能云外框架项目)`));
        console.log(chalk.green(`npm run start (本地开发)`));
      }

    });

  })
};

module.exports = project;


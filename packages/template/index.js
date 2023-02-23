const compressing = require("compressing");
const fse = require("fs-extra");
const path = require("path");
const ora = require("ora");

// 压缩模板
const zipTemp = () => {
  // 先复制出模板，然后删除多余文件
  const promiseArr = [];
  const dirArr = ["spa", "sspa-app", "sspa-main"];
  const spinner = ora("准备压缩资源").start();
  dirArr.forEach((name) => {
    const p = new Promise((resolve, reject) => {
      fse.copySync(path.join(__dirname, name), path.join(__dirname, "__temp__", name));
      fse.removeSync(path.join(__dirname, "__temp__", name, "dist"));
      fse.removeSync(path.join(__dirname, "__temp__", name, "dist.zip"));
      fse.removeSync(path.join(__dirname, "__temp__", name, "node_modules"));
      fse.removeSync(path.join(__dirname, "__temp__", name, "package-lock.json"));
      compressing.zip
        .compressDir(path.join(__dirname, "__temp__", name), path.join(__dirname, "zip", `${name}.zip`))
        .then((res) => {
          console.log(`成功打包${name}.zip`);
          resolve(true);
        })
        .catch((err) => {
          console.err(`打包${name}.zip失败`);

          console.log(err);
          reject();
        });
    });
    promiseArr.push(p);
  });
  Promise.all(promiseArr)
    .then((res) => {
      fse.removeSync(path.join(__dirname, "__temp__"));
      spinner.succeed("✅ 全部打包完成！！！");
    })
    .catch(() => {
      fse.removeSync(path.join(__dirname, "__temp__"));
      spinner.fail("资源下载失败");
      process.exit(1);
    });
};

zipTemp();

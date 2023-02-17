# 模板文件中 app.config.js 配置说明

`app.config.js` 文件是整个项目的配置文件，很多配置可以直接覆盖 cl-scripts 中默认配置，尤其针对 webpack 配置这一块。

## 参数配置

|参数|默认值|类型|说明|
| --- | --- |--- |--- |
|**title**|-| `String` |项目标题会初始化index.html里header头的title|
|**sourceMap**|true| `Boolean` |生成环境是否生成.map后缀文件，方面生产环境报错时快速定位问题|
|**entry**|<pre>{main: "src/main.js"}</pre>| `Object` |webpack打包的入口, 多页面时设置多入口即可|

# 模板文件中 app.config.js 配置说明

`app.config.js` 文件是整个项目的配置文件，很多配置可以直接覆盖 cl-scripts 中默认配置，尤其针对 webpack 配置这一块。

## 参数配置

<table>
<tr>
<th>参数</th><th>默认值</th><th>类型</th><th>说明</th>
</tr>

<tr>
<td>title</td>
<td>-</td>
<td>String</td>
<td>项目标题会初始化index.html里header头的title</td>
</tr>

<tr>
<td>devOpen</td>
<td>true</td>
<td>Boolean</td>
<td>开发环境是否自动打开浏览器</td>
</tr>

<tr>
<td>port</td>
<td>8080</td>
<td>Number</td>
<td>开发环境启动时的端口号</td>
</tr>

<tr>
<td>proxy</td>
<td>{}</td>
<td>Object</td>
<td>代理，示例：
<pre>

    {"/zzt_api/cwl_api/": {

      target: "http://cwldev.cm253.com",
      changeOrigin: true,
      pathRewrite: { "^/zzt_api/cwl_api/": "/" },
    }}

</pre>
</td>

</tr>

<tr>
<td>sourceMap</td>
<td>true</td>
<td>Boolean</td>
<td>生成环境是否生成.map后缀文件，方便生产环境报错时快速定位问题</td>
</tr>

<tr>
<td>buildDir</td>
<td>dist</td>
<td>String</td>
<td>build产生的静态资源目录名称</td>
</tr>

<tr>
<td>publicPath</td>
<td>/</td>
<td>String</td>
<td>index.html中静态资源引用的路径，可以是绝对也可以是域名</td>
</tr>

<tr>
<td>Analyze</td>
<td>false</td>
<td>Boolean</td>
<td>Build打包编译后是否开启构建包分析功能，设置打开后，每次编译后，都可以在http://127.0.0.1:8888/查看编译分析详细内容</td>
</tr>

<tr>
<td>buildZip</td>
<td>false</td>
<td>Boolean</td>
<td>是否开启build成功后自动把dist压缩成zip文件</td>
</tr>

<tr>
<td>entry</td>
<td><pre>{main: "src/main.js"}</pre></td>
<td>Object</td>
<td>iwebpack打包的入口, 多页面时设置多入口即可</td>
</tr>

<tr>
<td>extensions</td>
<td><pre>[".js", ".jsx", ".ts", ".tsx", ".less", ".json"]</pre></td>
<td>Array</td>
<td>i项目中引用文件时可以省略的后缀名</td>
</tr>

<tr>
<td>modulesAlias</td>
<td><pre>{
  "@": "src", 
  "components": "src/components", 
  "pages": "src/pages", 
  "assets": "src/assets"
  }</pre></td>
<td>Object</td>
<td>项目中引用文件路径前缀别名，无需“../../”</td>
</tr>

<tr>
<td>styleType</td>
<td><pre>["less"]</pre></td>
<td>Array</td>
<td>项目中包含的CSS 扩展语言，默认支持Less，如果换成sass可以直接["sass"]</td>
</tr>

<tr>
<td>env</td>
<td>{
  NODE_ENV: 当前环境变量的值，如development
}</td>
<td>Array</td>
<td>当前的环境变量，项目中科院通过process.env. 键值获取</td>
</tr>

<tr>
<td>plugins</td>
<td>[]</td>
<td>Array</td>
<td>给webpack的plugins添加额外的配置插件</td>
</tr>

<tr>
<td>devServer</td>
<td><pre>{}</pre></td>
<td>Object</td>
<td>覆盖devServer的配置信息, 无特殊需求无需修改</td>
</tr>

<tr>
<td>webpackConfig</td>
<td><pre>(_config)=>{return _config}</pre></td>
<td>Function</td>
<td>架手架会把当前的环境下的webpack配置以参数的形式提供出来，然后修改后，再返回。一般情况话不需要设置，除非要做大量改动。</td>
</tr>

</table>

const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const AppConfig = require("../app.config");
const webpackConfigBase = require("./webpack.base");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const chalk = require("chalk");

console.log(`${chalk.green("The current running environments：")}${chalk.blue("development")}`);

const webpackConfigDev = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      hash: true, //防止相同缓存
      inject: true,
      filename: "index.html",
      templateParameters: {
        title: AppConfig.title || "",
        dlls: [],
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin(),
  ],

  devServer: {
    clientLogLevel: "warning",
    contentBase: path.join(__dirname, "../dist"),
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    open: AppConfig.autoOpen || false,
    hot: true,
    quiet: true,
    noInfo: true,
    overlay: {
      errors: true,
    },
    host: "0.0.0.0",
    port: AppConfig.port,
    proxy: AppConfig.proxy || {},
  },
};

module.exports = merge(webpackConfigBase, webpackConfigDev);

console.log(`${chalk.green("Run address：")}${chalk.blue("http://localhost:%s")}`, AppConfig.port);

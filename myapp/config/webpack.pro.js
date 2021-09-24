const path = require("path");
const AppConfig = require("../app.config");
const { merge } = require("webpack-merge");
const webpackConfigBase = require("./webpack.base");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const chalk = require("chalk");

console.log(`${chalk.green("The current running environments：")}${chalk.blue("production")}`);
const webpackConfigProd = {
  mode: "production",
  devtool: "source-map",
  optimization: {
    splitChunks: {
      chunks: "async",
      name: true,
      minChunks: 1,
      cacheGroups: {
        vendors: {
          chunks: "all",
          maxSize: 100 * 1024,
          minChunks: 1,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          maxSize: 200 * 1024,
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserJSPlugin({
        sourceMap: false,
        cache: path.resolve(".cache"),
        parallel: true, // 开启多进程压缩
        terserOptions: {
          compress: {
            drop_console: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        sourceMap: false,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      hash: true, //防止相同缓存
      filename: "index.html",
      templateParameters: {
        title: AppConfig.title || "",
        dlls: [
          "https://static.253.com/js/common_dll/common.dll.js",
          "https://static.253.com/js/common_dll/react.dll.js",
          "https://static.253.com/js/common_dll/react_redux.dll.js",
        ],
      },
      inject: true,
      // noInfo: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: AppConfig.analyzer ? "server" : "disabled",
    }),
  ],
};

module.exports = merge(webpackConfigBase, webpackConfigProd);

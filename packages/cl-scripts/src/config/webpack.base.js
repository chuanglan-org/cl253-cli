"use strict";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const appPaths = require("../config/app_path");
const appConfig = require("../config/app_config");

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";
  // 获得样式loader
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve("style-loader"),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: require.resolve("css-loader"),
        options: cssOptions,
      },
      {
        loader: require.resolve("postcss-loader"),
        options: {
          postcssOptions: {
            ident: "postcss",
            config: false,
            plugins: [
              "postcss-flexbugs-fixes",
              [
                "postcss-preset-env",
                {
                  autoprefixer: {
                    flexbox: "no-2009",
                  },
                  stage: 3,
                },
              ],
              "postcss-normalize",
            ],
          },
          sourceMap: isEnvProduction ? appConfig.sourceMap : isEnvDevelopment,
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve("resolve-url-loader"),
          options: {
            sourceMap: isEnvProduction ? appConfig.sourceMap : isEnvDevelopment,
            root: appPaths.appSrc,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        }
      );
    }
    return loaders;
  };
  // 获得入口文件
  const getEntry = () => {
    const obj = {};
    Object.keys(appConfig.entry).forEach((item) => {
      obj[item] = path.join(appPaths.appRoot, appConfig.entry[item]);
    });
    return obj;
  };

  return {
    target: ["browserslist"],
    stats: "errors-warnings",
    mode: isEnvProduction ? "production" : "development",
    bail: isEnvProduction, // 当生产环境时，只要编译报错就退出
    devtool: isEnvProduction
      ? appConfig.sourceMap
        ? "source-map"
        : false
      : isEnvDevelopment && "cheap-module-source-map",
    entry: getEntry(),
  };
};

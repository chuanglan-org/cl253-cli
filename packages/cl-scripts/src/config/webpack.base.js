"use strict";

const webpack = require("webpack");
const appPaths = require("../config/app_path");
const appConfig = require("../config/app_config");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const Modules = require("../utils/modules");
const getCacheIdentifier = require("../utils/cache_ldentifier");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";
  const webpackmodules = Modules();
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
            lessOptions: {
              modifyVars: {
                hack: `true; @import "${appPaths.resolveApp(
                  `src/assets/style/theme.${preProcessor === "sass-loader" ? "sass" : "less"}`
                )}";`,
              },
              javascriptEnabled: true,
            },
          },
        }
      );
    }
    return loaders;
  };

  return {
    target: "browserslist",
    stats: "errors-warnings",
    mode: isEnvProduction ? "production" : "development",
    bail: isEnvProduction, // 当生产环境时，只要编译报错就退出
    devtool: isEnvProduction
      ? appConfig.sourceMap
        ? "source-map"
        : false
      : isEnvDevelopment && "cheap-module-source-map",
    entry: appConfig.entry,
    output: {
      path: appConfig.buildDir,
      pathinfo: isEnvDevelopment,
      filename: isEnvProduction ? "static/js/[name].[contenthash:8].js" : isEnvDevelopment && "static/js/[name].js",
      chunkFilename: isEnvProduction
        ? "static/js/[name].[contenthash:8].chunk.js"
        : isEnvDevelopment && "static/js/[name].chunk.js",
      assetModuleFilename: "static/media/[name].[hash][ext]",
      publicPath: appConfig.publicPath,
    },
    resolve: {
      modules: ["node_modules", appPaths.appNodeModules],
      extensions: appConfig.extensions,
      alias: {
        ...webpackmodules.modulesAlias,
        ...appConfig.modulesAlias,
      },
    },
    module: {
      rules: [
        appConfig.sourceMap && {
          enforce: "pre",
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          test: /\.(js|mjs|jsx|ts|tsx|css)$/,
          loader: require.resolve("source-map-loader"),
        },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              type: "asset",
              parser: {
                dataUrlCondition: {
                  maxSize: 10000,
                },
              },
            },
            {
              test: /\.svg$/,
              use: [
                {
                  loader: require.resolve("@svgr/webpack"),
                  options: {
                    prettier: false,
                    svgo: false,
                    svgoConfig: {
                      plugins: [{ removeViewBox: false }],
                    },
                    titleProp: true,
                    ref: true,
                  },
                },
                {
                  loader: require.resolve("file-loader"),
                  options: {
                    name: "static/media/[name].[hash].[ext]",
                  },
                },
              ],
              issuer: {
                and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
              },
            },
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: appPaths.appSrc,
              loader: require.resolve("babel-loader"),
              options: {
                customize: require.resolve("babel-preset-react-app/webpack-overrides"),
                presets: [
                  [
                    require.resolve("babel-preset-react-app"),
                    {
                      runtime: "classic",
                    },
                  ],
                ],
                babelrc: false,
                configFile: false,
                cacheIdentifier: getCacheIdentifier(
                  isEnvProduction ? "production" : isEnvDevelopment && "development",
                  ["babel-plugin-named-asset-import", "babel-preset-react-app", "cl-scripts"]
                ),
                plugins: [isEnvDevelopment && require.resolve("react-refresh/babel")].filter(Boolean),
                cacheDirectory: true,
                cacheCompression: false,
                compact: isEnvProduction,
              },
            },
            {
              test: /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve("babel-loader"),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: [[require.resolve("babel-preset-react-app/dependencies"), { helpers: true }]],
                cacheDirectory: true,
                cacheCompression: false,
                cacheIdentifier: getCacheIdentifier(
                  isEnvProduction ? "production" : isEnvDevelopment && "development",
                  ["babel-plugin-named-asset-import", "babel-preset-react-app", "cl-scripts"]
                ),
                sourceMaps: appConfig.sourceMap,
                inputSourceMap: appConfig.sourceMap,
              },
            },
            // 所有的css样式都不进行has值编译
            {
              test: /\.css$/,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction ? appConfig.sourceMap : isEnvDevelopment,
                modules: {
                  mode: "icss",
                },
              }),
              sideEffects: true,
            },
            // 如果包含sass样式
            (appConfig.styleType.includes("sass") || appConfig.styleType.includes("scss")) && {
              test: /\.(scss|sass)$/,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction ? appConfig.sourceMap : isEnvDevelopment,
                  modules: {
                    mode: "local",
                    localIdentName: "[local]--[hash:base64:5]",
                    auto: (resourcePath) => {
                      return !/(\/|\\)node_modules(\/|\\)|(\/|\\)src(\/|\\)assets/g.test(resourcePath);
                    },
                  },
                },
                "sass-loader"
              ),
            },
            // 如果包含less样式
            appConfig.styleType.includes("less") && {
              test: /\.less$/,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction ? appConfig.sourceMap : isEnvDevelopment,
                  modules: {
                    mode: "local",
                    localIdentName: "[local]--[hash:base64:5]",
                    auto: (resourcePath) => {
                      return !/(\/|\\)node_modules(\/|\\)|(\/|\\)src(\/|\\)assets/g.test(resourcePath);
                    },
                  },
                },
                "less-loader"
              ),
            },
            {
              exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              type: "asset/resource",
            },
          ].filter(Boolean),
        },
      ].filter(Boolean),
    },

    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserJSPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: appPaths.appHtml,
        templateParameters: {
          title: appConfig.title || "",
          isdev: process.env.NODE_ENV === "development",
        },
        minify: isEnvProduction
          ? {
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
            }
          : false,
      }),
      // 环境变量
      new webpack.DefinePlugin({
        "process.env": Object.keys({ ...appConfig.env, NODE_ENV: webpackEnv }).reduce((env, key) => {
          env[key] = JSON.stringify(appConfig.env[key]);
          return env;
        }, {}),
      }),
      // 让本地能够刷新
      isEnvDevelopment &&
        new ReactRefreshWebpackPlugin({
          overlay: false,
        }),
      // 如果您在路径中键入了错误的大小写，则Watcher无法正常工作，因此我们使用
      // 当您尝试执行此操作时打印错误的插件
      isEnvDevelopment && new CaseSensitivePathsPlugin(),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash:8].css",
          chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        }),

      new WebpackManifestPlugin({
        fileName: "asset-manifest.json",
        publicPath: appConfig.publicPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter((fileName) => !fileName.endsWith(".map"));
          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      ...appConfig.plugins,
    ].filter(Boolean),
    infrastructureLogging: {
      level: "none",
    },
    performance: false,
  };
};

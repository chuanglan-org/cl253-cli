const path = require("path");
const webpack = require("webpack");
const AppConfig = require("../app.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StatsPlugin = require("stats-webpack-plugin");
const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const isDev = process.env.NODE_ENV === "development";
const resolve = (relatedPath) => {
  return path.join(__dirname, relatedPath);
};
module.exports = {
  context: resolve("../"),
  entry: {
    main: ["./src/main.js"],
    store: ["./src/redux/index"],
  },
  output: {
    path: resolve("../dist"),
    filename: isDev ? "js/[name].js" : "js/[name].[contenthash].js",
    chunkFilename: isDev ? "js/[id].js" : "js/[id].[contenthash].js",
    publicPath:
      process.env.NODE_ENV === "production" ? `/${AppConfig.appName}/` : `http://localhost:${AppConfig.port}/`,
    libraryTarget: "umd",
    library: AppConfig.appName,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".less", ".json"],
    modules: ["../node_modules"],
    alias: {
      "@": resolve(`../src`),
      components: resolve(`../src/components`),
      pages: resolve(`../src/pages`),
      assets: resolve(`../src/assets`),
      ...(AppConfig.alias || {}),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "happypack/loader?id=babel",
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: isDev,
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: !isDev,
              modules: {
                mode: "local",
                localIdentName: "[local]--[hash:base64:5]",
                auto: (resourcePath) => {
                  return !/(\/|\\)node_modules(\/|\\)|(\/|\\)src(\/|\\)assets/g.test(resourcePath);
                },
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")],
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: {
                  hack: `true; @import "${resolve(`../src/assets/style/theme.less`)}";`,
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10240,
          name: path.posix.join("img/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "happypack/loader?id=mphappy",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "happypack/loader?id=fonthappy",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDev ? "css/style.css" : "css/[contenthash].[id].css",
      chunkFilename: isDev ? "css/[id].css" : "css/[contenthash].[id].css",
      ignoreOrder: true,
    }),
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.title": JSON.stringify(AppConfig.title),
      "process.env.baseName": JSON.stringify(`/${AppConfig.appName}`),
    }),
    new HappyPack({
      id: "babel",
      loaders: [
        {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  targets: {
                    browsers: ["last 2 versions"],
                  },
                  corejs: 2,
                },
              ],
              "@babel/preset-react",
            ],
            plugins: [
              [
                "@babel/transform-runtime",
                {
                  absoluteRuntime: false,
                  corejs: 2,
                  helpers: true,
                  regenerator: true,
                  useESModules: false,
                },
              ],
              [
                "@babel/plugin-proposal-decorators",
                {
                  legacy: true,
                },
              ],
              "@babel/plugin-proposal-class-properties",
              [
                "import",
                {
                  libraryName: "antd",
                  libraryDirectory: "es",
                  style: true, // `style: true` 会加载 less 文件
                },
              ],
            ],
          },
        },
        {
          loader: "eslint-loader", // 指定启用eslint-loader
          options: {
            quiet: true,
          },
        },
      ],
      threadPool: happyThreadPool,
      verbose: false,
    }),
    new HappyPack({
      id: "mphappy",
      loaders: [
        {
          loader: "url-loader",
          options: {
            limit: 10240,
            name: path.posix.join("media/[name].[hash:7].[ext]"),
          },
        },
      ],
      threadPool: happyThreadPool,
      verbose: false,
    }),
    new HappyPack({
      id: "fonthappy",
      loaders: [
        {
          loader: "url-loader",
          options: {
            limit: 10240,
            name: path.posix.join("fonts/[name].[hash:7].[ext]"),
          },
        },
      ],
      threadPool: happyThreadPool,
      verbose: false,
    }),

    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new StatsPlugin("manifest.json", {
      chunkModules: false,
      entrypoints: true,
      logging: false,
      source: false,
      chunks: false,
      modules: false,
      assets: false,
      children: false,
      chunkGroups: false,
      outputPath: false,
      exclude: [/node_modules/],
    }),
  ],
  node: {
    setImmediate: false,
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
};

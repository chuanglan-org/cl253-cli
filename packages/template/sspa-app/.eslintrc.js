module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["ali/react", "plugin:prettier/recommended"],
  rules: {
    quotes: [1, "double"], // 引号类型 `` "" ''
    eqeqeq: "off", // 强制===关闭
    radix: "off", // 使用parseInt无需配置第二个参数
    "padded-blocks": "off",
    "guard-for-in": "off",
    "max-len": "off", // 每行最大长度
    "no-console": "off", // 允许打印日志
    "no-param-reassign": "off", // 函数参数允许重新设值
    "no-nested-ternary": "off", // 允许设值三元表达式
    "no-unused-vars": "off", // 未定义警告关闭
    "no-useless-constructor": "off", // 允许空的构造函数
    "no-case-declarations": "off",
    "prefer-const": "off", // 不强制不变的变量都用const
    "prefer-promise-reject-errors": "off", // 无需强制配置reject
    "react/display-name": "off",
    "react/prop-types": "off", // 无需对props是否存在值校验
    "react/no-array-index-key": "off", // 允许使用数组的index作为key的索引
    "react/no-danger": "off", // 允许使用dangerouslySetInnerHTML赋值
    "react/jsx-uses-react": "off", // 允许引用未使用的react
    "react/no-unused-state": "off",
    "react/no-typos": "off",
    "react/no-access-state-in-setstate": "off",
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "import/newline-after-import": "off",
  },
  settings: {
    "import/ignore": ["node_modules"],
    "import/resolver": {
      // 忽略webpack 别名的报错
      alias: {
        map: [
          ["@", "./src"],
          ["components", "./src/components"],
          ["pages", "./src/pages"],
          ["assets", "./src/assets"],
        ],
        extensions: [".js", ".jsx", ".ts", ".less", ".json"],
      },
    },
  },
};

module.exports = {
  root: true,
  extends: ["eslint-config-ali", "plugin:prettier/recommended"],
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    quotes: [1, "double"], // 引号类型 `` "" ''
    "padded-blocks": "off",
    "guard-for-in": "off",
    "max-len": "off", // 每行最大长度
    "no-console": "off", // 允许打印日志
    "no-param-reassign": "off", // 函数参数允许重新设值
    "no-nested-ternary": "off", // 允许设值三元表达式
    "no-unused-vars": "off", // 未定义警告关闭
    "no-useless-constructor": "off", // 允许空的构造函数
    "no-case-declarations": "off",
  },
};

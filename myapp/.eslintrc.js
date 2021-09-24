module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ["react", "react-hooks"],
  extends: ["eslint-config-ali/react", "plugin:prettier/recommended"],
  parser: "babel-eslint",
  globals: {
    Atomics: "readonly",
    window: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    semi: 2, //强制使用分号
    "prefer-const": 0,
    "no-unused-vars": "off",
    "spaced-comment": "off",
    "no-nested-ternary": "off",
    "no-const-assign": 2, //禁止修改const声明的变量
    "no-dupe-keys": 2, //在创建对象字面量时不允许键重复
    "no-duplicate-case": 2, //switch中的case标签不能重复
    "no-dupe-args": 2, //函数参数不能重复
    "no-func-assign": 2, //禁止重复的函数声明
    "no-redeclare": 2, //禁止重复声明变量
    "no-undef": 2, //不能有未定义的变量
    "no-console": "off",
    "no-param-reassign": "off",
    "no-useless-constructor": 0,
    "react/jsx-uses-react": "off",
    "react/no-danger": 0, //防止使用危险的JSX属性
    "react/no-multi-comp": 2, //防止每个文件有多个组件定义
    "react/no-unknown-property": 2, //防止使用未知的DOM属性
    "react/self-closing-comp": "off",
    "react/react-in-jsx-scope": 2, //使用JSX时防止丢失React
    "react/no-unused-state": 0,
    "react/no-array-index-key": 0,
    "react/no-typos": 0,
    "react/prop-types": 0,
    "react/no-access-state-in-setstate": "off",
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn", // 检查 effect 的依赖
    "jsx-a11y/anchor-is-valid": 0,
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 0,
    "import/newline-after-import": 0,
    "no-case-declarations": "off",
    "no-unreachable": 1, //不能有无法执行的代码
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  settings: {
    "import/ignore": ["node_modules"],
  },
};

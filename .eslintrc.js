module.exports = {
  root: true,
  extends:["eslint:recommended"],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    quotes: [1, "double"], // 引号类型 `` "" ''
  }
}
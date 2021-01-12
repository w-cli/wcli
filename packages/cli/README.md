# wcli

自动化构架项目脚手架，搭配模板[wcli-spa](https://github.com/w-cli/wcli-spa)使用

## 配置项

根目录创建`.wclirc.js`，可配置内容：

```js
module.exports = {
  entry: {}, //入口
  output: './dist' //输出目录
  hotload: true, //是否热更新
  proxy: {}, //代理
  devMiddlewareConfig:{}, //webpack-dev-middleware配置
  port: 8081 //启动端口号 ，可以通过命令行设置
  theme: {}, //主题配置，js文件
  webpackChain:(config) => config  //webpack-chain实例
}
```

具体配置可参考：[自定义配置文件](https://github.com/w-cli/wcli/blob/master/packages/cli/config/index.ts)

## 环境变量：

- `process.env.WCLI_RUN_TYPE`: 执行方式
  - `START`: 开发模式
  - `BUILD`: 构建模式
- `process.env.WCLI_RUN_ENV`: 启动或构建环境，如`dev`

## 启动

端口号可选，默认`8081`

```bash
wcli start -p 8082
```

## 构建

```bash
wcli build
# 指定环境
wcli build -t prod
```

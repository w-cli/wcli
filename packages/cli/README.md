# wcli

自动化构架项目脚手架，搭配模板[wcli-spa](https://github.com/w-cli/wcli-spa)使用

## 配置项

根目录创建`.wclirc.js`，可配置内容：

```js
module.exports = {
  webpack: {
    entry: {}, //入口
    output: {}, //输出目录
    hotload:true, //是否热更新
    dev: { //开发配置，格式为webpack配置
      devtool: 'source-map'
    },
    build: {}, //构建配置，格式为webpack配置
    proxy: {}, //接口代理，参考，webpack-dev-server
    cssConfig: { //css loader 配置
      module: false
    },
    port: 8081 //启动端口号 ，可以通过命令行设置
  },
  theme: {}, //主题配置，js文件
  envs: ['dev', 'sit'] //启动、构建环境
}
```

具体配置可参考：[自定义配置文件](https://github.com/w-cli/wcli/blob/master/packages/cli/config/index.js)

## 环境变量：

- `process.env.RUN_TYPE`: 启动方式
  -  `START`: 启动模式
  -  `BUILD`: 构建模式
- `process.env.RUN_ENV`: 启动或构建环境，如`dev`

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

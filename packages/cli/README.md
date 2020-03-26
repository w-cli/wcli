## wcli

### 自定义配置

根目录创建`.wclirc.js`，可配置内容：

```js
module.exports = {
  webpack: {
    entry: {},
    output: {},
    dev: {},
    build: {},
    proxy: {},
    port: 8081
  },
  theme: {},
  envs: ['dev', 'sit'],
  ts: {
    mode: false
  }
}
```

具体配置可参考：[自定义配置文件](https://github.com/w-cli/wcli/blob/master/packages/cli/config/index.js)

### 环境变量：

- `process.env.RUN_TYPE`: 启动方式 `START` or `BUILD`
- `process.env.RUN_ENV`: 启动环境，如`dev`

### 启动

端口号可选，默认`8081`

```bash
wcli start -p 8082
```

### 构建

```bash
wcli build
```

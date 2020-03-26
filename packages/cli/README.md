## wcli

### 自定义配置

根目录创建`.ofnrc.js`，可配置内容：

```json
{
  //webpack
  "webpack": {
    "entry": {},
    "output": {},
    "dev": {},
    "build": {},
    "proxy": {},
    "port": 8081
  },
  "theme": {},
  "envs": ["dev", "sit"],
  "ts": {
    "mode": false
  }
}
```

获取内部环境变量：

- `process.env.RUN_TYPE`: 启动方式 START | BUILD
- `process.env.RUN_ENV`: 启动环境，如`dev`

### 启动

端口号可选，默认`8081`

```
wcli start -p 8082
```

### 构建

```
wcli build
```

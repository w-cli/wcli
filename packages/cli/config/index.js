const { existsSync } = require('fs-extra')
const { root } = require('../utils')
const { merge } = require('lodash')

const CONFIG_FILES = ['.wclirc.ts', '.wclirc.js', '.wclirc']
const getUserConfig = () => {
  const configFile = CONFIG_FILES.find(f => existsSync(root(f)))
  return configFile ? require(configFile) : {}
}

const {
  webpack: cfgWeback = {},
  theme = {},
  envs,
  ssr = {
    mode: false
  },
  babelConfig = {},
  injectWebpack = () => {}
} = getUserConfig()

const { build = {} } = cfgWeback
//获取输出文件相对路径
const getOutputStaticPath = (assets, name) => {
  return assets ? `${assets}/${name}` : name
}

//webpack 自定义配置
const webpackConfig = merge(
  {
    entry: {
      app: [root(`src/index`)]
    },
    output: {
      filename: getOutputStaticPath(build.assets, 'js/[name].js'),
      path: root('dist'),
      publicPath: '/',
      chunkFilename: getOutputStaticPath(build.assets, 'js/[name].js')
    },
    hotload: true,
    devMiddleware: {},
    dev: {
      devtool: 'source-map'
    },
    build: {
      sourceMap: false,
      bundleAnaly: false
    },
    src: root('src'),
    port: 8081,
    proxy: {},
    htmlConfig: {
      template: `${root('src')}/index.html`,
      inject: true,
      hash: true
    },
    cssConfig: {
      module: true //如果设置true,则默认pages、components 目录会module处理
    },
    injectWebpack: config => config, // 在最后准备构建的时候暴露出的配置，可以定制化
    //是否是服务端渲染
    ssr: {
      entry: root('src/ssr'),
      output: root('dist/server'),
      ...ssr
    }
  },
  cfgWeback
)

//babel自定义配置
const babelMergeConfig = merge(
  {
    include: [],
    plugins: []
  },
  babelConfig
)

module.exports = {
  webpack: webpackConfig,
  injectWebpack,
  theme,
  envs,
  babel: babelMergeConfig,
  getOutputStaticPath
}

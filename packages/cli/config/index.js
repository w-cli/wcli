const fs = require('fs-extra')
const { root } = require('../utils')
const { merge } = require('lodash')
const customConfigPath = root('.wclirc.js')

const getUserConfig = () => {
  if (fs.existsSync(customConfigPath)) {
    return require(customConfigPath)
  }
  return {}
}

const {
  webpack: cfgWeback = {},
  theme = {},
  envs,
  ts = {
    mode: false
  },
  babelConfig = {}
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
      app: [root(`src/index.${ts.mode ? 'tsx' : 'js'}`)]
    },
    output: {
      filename: getOutputStaticPath(build.assets, 'js/[name].js'),
      path: root('dist'),
      publicPath: '/',
      chunkFilename: getOutputStaticPath(build.assets, 'js/[name].js')
    },
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
      module: true
    }
  },
  cfgWeback
)

//babel自定义配置
const babel = merge(
  {
    include: [customConfigPath],
    plugins: []
  },
  babelConfig
)

module.exports = {
  webpack: webpackConfig,
  theme,
  envs,
  babel,
  getOutputStaticPath
}

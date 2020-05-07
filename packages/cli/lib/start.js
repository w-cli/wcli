const history = require('connect-history-api-fallback')
const express = require('express')
const webpack = require('webpack')
const inquirer = require('inquirer')
const proxyMiddleware = require('http-proxy-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const chalk = require('chalk')
const app = express()
const { choices, util } = require('../utils')
const rimraf = util.promisify(require('rimraf'))
const {
  webpack: {
    port: cfgPort,
    proxy = {},
    output = {},
    hotload,
    devMiddleware: devMiddlewareConfig
  } = {}
} = require('../config')

module.exports = async ({ port }) => {
  await rimraf(output.path) //删除打包文件
  const { version } = await inquirer.prompt(choices())
  port && (process.env.RUN_PORT = port)
  process.env.RUN_TYPE = 'START'
  process.env.RUN_ENV = version
  const webpackConfig = require('../config/webpack.config.dev')
  const compiler = webpack(webpackConfig)
  Object.keys(proxy).forEach(context => {
    const options = proxy[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
  })
  app.use(history({ rewrites: [{ from: /\w+\.html/, to: '/' }] }))
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: output.publicPath,
    quiet: true,
    writeToDisk: false,
    ...devMiddlewareConfig
  })
  hotload && app.use(webpackHotMiddleware(compiler))
  app.use(devMiddleware)
  const startPort = port || cfgPort
  const uri = 'http://localhost:' + startPort
  devMiddleware.waitUntilValid(function() {
    console.log(chalk.green('> Listening at ' + uri + '\n'))
  })
  app.listen(startPort, function(err) {
    if (err) console.log(err)
  })
}

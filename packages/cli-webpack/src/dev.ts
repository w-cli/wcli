import history from 'connect-history-api-fallback'
import webpack from 'webpack'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import chalk from 'chalk'
import util from 'util'
import rimraf from 'rimraf'
import { initConfig, config } from './core'
const rimrafAsync = util.promisify(rimraf)
const app = express()

export default async ({ port, version }: any = {}) => {
  const {
    output,
    webpackChain,
    proxy = {},
    publicPath,
    devMiddlewareConfig = {},
    hotload = true,
    port: defaultPort
  } = config
  await rimrafAsync(output)
  process.env.WCLI_RUN_TYPE = 'START'
  process.env.WCLI_RUN_ENV = version
  let webpackConfig = initConfig({ mode: 'development' })
  if (typeof webpackChain === 'function') {
    webpackConfig = webpackChain(webpackConfig)
  }
  const compiler = webpack(webpackConfig.toConfig())
  Object.keys(proxy).forEach(context => {
    let options = proxy[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    app.use(createProxyMiddleware(context, options))
  })
  app.use(history({ rewrites: [{ from: /\w+\.html/, to: '/' }] }))
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: publicPath,
    quiet: true,
    writeToDisk: false,
    ...devMiddlewareConfig
  })
  hotload && app.use(webpackHotMiddleware(compiler))
  app.use(devMiddleware)
  const startPort = port || defaultPort
  const uri = 'http://localhost:' + startPort
  devMiddleware.waitUntilValid(() => {
    console.log(chalk.green('> Listening at ' + uri + '\n'))
  })
  app.listen(startPort, err => {
    if (err) console.log(err)
  })
}

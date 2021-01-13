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
import { setEnv } from './helper/applyEnv'
const rimrafAsync = util.promisify(rimraf)
const app = express()

type IProps = {
  port: string
}

export default async ({ port }: IProps) => {
  const {
    output,
    webpackChain,
    proxy,
    devMiddlewareConfig,
    hotload,
    port: defaultPort
  } = config
  output && (await rimrafAsync(output))
  setEnv({ WCLI_RUN_TYPE: 'START' })
  let webpackConfig = initConfig({ mode: 'development' })
  if (typeof webpackChain === 'function') {
    webpackConfig = webpackChain(webpackConfig)
  }
  const webpackConfigObj = webpackConfig.toConfig()
  const compiler = webpack(webpackConfigObj)
  Object.keys(proxy).forEach(context => {
    let options = proxy[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    app.use(createProxyMiddleware(context, options))
  })
  app.use(history({ rewrites: [{ from: /\w+\.html/, to: '/' }] }))
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfigObj.output.publicPath,
    quiet: true,
    writeToDisk: false,
    ...devMiddlewareConfig
  })
  hotload && app.use(webpackHotMiddleware(compiler))
  app.use(devMiddleware)
  const startPort = port || defaultPort
  devMiddleware.waitUntilValid(() => {
    console.log(
      chalk.green('> Listening at http://localhost:' + startPort + '\n')
    )
  })
  app.listen(startPort, err => {
    if (err) console.log(err)
  })
}

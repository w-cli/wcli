import webpack from 'webpack'
import chalk from 'chalk'
import rimraf from 'rimraf'
import util from 'util'
import { initConfig, config } from './core'
import { setEnv } from './helper/applyEnv'
const rimrafAsync = util.promisify(rimraf)

export default async () => {
  const { output, webpackChain } = config
  setEnv({ WCLI_RUN_TYPE: 'BUILD' })
  let webpackConfig = initConfig({ mode: 'production' })
  if (typeof webpackChain === 'function') {
    webpackConfig = webpackChain(webpackConfig)
  }
  output && (await rimrafAsync(output))
  webpack(webpackConfig.toConfig(), (err, stats) => {
    if (err) throw err
    console.log(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      })
    )
    console.log(chalk.green('构建完成'))
  })
}

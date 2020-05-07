const webpack = require('webpack')
const chalk = require('chalk')
const { webpack: { output, ssr } = {} } = require('../config')
const { util } = require('../utils')
const rimraf = util.promisify(require('rimraf'))

module.exports = async ({ type = 'dev' }) => {
  process.env.RUN_TYPE = 'BUILD'
  process.env.RUN_ENV = type
  console.log(chalk.green(`You are building ${type} version`))
  let dist = output.path
  let webpackConfig = require('../config/webpack.config.prod')
  if (type === 'ssr') {
    dist = ssr.output
    webpackConfig = require('../config/webpack.config.ssr')
  }
  await rimraf(dist)
  webpack(webpackConfig, (err, stats) => {
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

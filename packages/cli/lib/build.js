const webpack = require('webpack')
const rimraf = require('rimraf')
const chalk = require('chalk')
const { webpack: { output } = {} } = require('../config')
module.exports = async ({ type = 'dev' }) => {
  process.env.RUN_TYPE = 'BUILD'
  process.env.RUN_ENV = type
  console.log(chalk.green(`You are building ${type} version`))
  rimraf(output.path, rmerr => {
    if (rmerr) throw rmerr
    const webpackConfig = require('../config/webpack.config.prod')
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
  })
}

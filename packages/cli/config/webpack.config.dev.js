const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')
const { webpack: { dev: devConfig, hotload } = {} } = require('.')

baseWebpackConfig.entry = {
  app: [...baseWebpackConfig.entry.app]
}

if (hotload) {
  baseWebpackConfig.entry.app.unshfit(
    require.resolve('webpack-hot-middleware/client')
  )
  baseWebpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = merge(
  baseWebpackConfig,
  {
    mode: 'development',
    plugins: [new ProgressBarPlugin({ summary: false })]
  },
  devConfig
)

const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')
const { webpack: { dev: devConfig } = {} } = require('.')
baseWebpackConfig.entry = {
  app: [
    require.resolve('webpack-hot-middleware/client'),
    ...baseWebpackConfig.entry.app
  ]
}

module.exports = merge(
  baseWebpackConfig,
  {
    mode: 'development',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ProgressBarPlugin({ summary: false })
    ]
  },
  devConfig
)

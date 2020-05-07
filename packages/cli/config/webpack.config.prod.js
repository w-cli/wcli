const UglifyJsPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')
const { webpack: { build } = {} } = require('.')

const prodConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: build.devtool || false,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: build.sourceMap || false
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      minChunks: 1,
      cacheGroups: {
        antd: {
          name: 'antd',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](antd|@ant-design|rc-[\w]+)[\\/]/
        },
        commons: {
          chunks: 'all',
          name: 'commons',
          test: /[\\/]node_modules[\\/][\\/]/
        }
      },
      ...(build.splitChunks || {})
    },
    runtimeChunk: 'single'
  },
  plugins: [...(build.plugins || [])]
})

if (build.bundleAnaly) {
  prodConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = prodConfig

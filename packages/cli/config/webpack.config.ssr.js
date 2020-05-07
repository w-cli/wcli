const nodeExternals = require('webpack-node-externals')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { webpack: webpackConfig } = require('.')
const { cssLoader } = require('./utils')
const { ssr, src, cssConfig } = webpackConfig

const ssrConfig = {
  mode: 'production',
  entry: {
    ssr: ssr.entry
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  output: {
    path: ssr.output,
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        include: [src],
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              cacheDirectory: true,
              cacheCompression: false,
              presets: [require.resolve('@wcli/babel-preset-app')]
            }
          }
        ]
      },
      cssLoader({
        ssr: true,
        modules: cssConfig.module,
        include: [`${src}/pages`, `${src}/components`]
      }),
      //其余模块不需要css module化
      cssLoader({
        ssr: false,
        modules: false,
        exclude: [`${src}/pages`, `${src}/components`]
      }),
      {
        test: /\.(css|svg|woff2?|ttf|eot|jpe?g|png|gif)$/,
        loader: require.resolve('ignore-loader')
      }
    ]
  },
  plugins: [new ProgressBarPlugin()]
}
module.exports = ssrConfig

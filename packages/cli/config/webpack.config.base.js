const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const tsImportPluginFactory = require('ts-import-plugin')
const {
  webpack: webpackConfig,
  theme,
  babel,
  getOutputStaticPath
} = require('.')

const moduleCss = (options, modules = true) => {
  return {
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: require.resolve('css-loader'),
        options: { modules }
      },
      {
        loader: require.resolve('less-loader'),
        options: { modifyVars: theme, javascriptEnabled: true }
      }
    ],
    ...options
  }
}

const {
  entry = {},
  output = {},
  alias = {},
  plugins = [],
  src,
  build = {},
  htmlConfig = {},
  cssConfig = {}
} = webpackConfig

module.exports = {
  entry,
  output,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': src,
      ...alias
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        include: [src, ...babel.include],
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              cacheDirectory: true,
              cacheCompression: false,
              presets: [require.resolve('@wcli/babel-preset-app')],
              plugins: [...babel.plugins]
            }
          },
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory({
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true
                  })
                ]
              }),
              compilerOptions: {
                module: 'es2015'
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('thread-loader'),
          require.resolve('style-loader'),
          require.resolve('css-loader')
        ]
      },
      moduleCss(
        { include: [`${src}/pages`, `${src}/components`] },
        cssConfig.module
      ),
      moduleCss(
        {
          exclude: [`${src}/pages`, `${src}/components`]
        },
        false
      ),
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('url-loader'),
          options: {
            limit: 1024,
            name: 'img/[sha512:hash:base64:7].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new ManifestPlugin(),
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(
        ['RUN_TYPE', 'RUN_ENV'].reduce((env, key) => {
          key && (env[key] = process.env[key])
          return env
        }, {})
      )
    }),
    new MiniCssExtractPlugin({
      filename: `${getOutputStaticPath(build.assets, 'css/[name].css')}`
    }),
    new HtmlWebpackPlugin({ ...htmlConfig }),
    ...plugins
  ]
}

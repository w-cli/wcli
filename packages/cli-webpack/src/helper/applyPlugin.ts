import webpack from 'webpack'
import { setEnv, getEnv } from './applyEnv'
import { IConfig } from '../config'
import Config from 'webpack-chain'

export default (
  webpackConfig: Config,
  config: IConfig,
  root: (args?: any) => string,
  __DEV__: boolean
) => {
  const {
    defines,
    htmlWebpackConfig,
    ssr,
    assets,
    hotload,
    devtool,
    splitChunks,
    analyze,
    dotenvConfig
  } = config

  const getEnvList = () => {
    setEnv(defines)
    return getEnv(['WCLI_RUN_TYPE'].concat(Object.keys(defines)))
  }

  // prettier-ignore
  webpackConfig
    .plugin('dotenv-webpack')
      .use(require.resolve('dotenv-webpack'),[
        {
          path:`${root()}/.env`,
          ...dotenvConfig
        }
      ])
    .end()
    .plugin('webpack-manifest-plugin')
      .use(require.resolve('webpack-manifest-plugin'))
    .end()
    .plugin('progress-bar-webpack-plugin')
      .use(require.resolve('progress-bar-webpack-plugin'),[
        { summary: false }
      ])
    .end()
    .plugin('html-webpack-plugin')
      .use(require.resolve('html-webpack-plugin'),[
        {
          template: `${root('src')}/index.html`,
          inject: true,
          hash: true,
          ...htmlWebpackConfig
        }
      ])
    .end()
    .plugin('webpack.DefinePlugin')
      .use(webpack.DefinePlugin,[
        {
          'process.env': JSON.stringify(getEnvList())
        }
      ])
    .end()
  // prettier-ignore
  if(!ssr){
    webpackConfig
    .plugin('mini-css-extract-plugin')
      .use(require.resolve('mini-css-extract-plugin'),
        [
          {
            filename: `${assets}/css/[name].css`,
            chunkFilename: `${assets}/css/[name].chunk.css`,
            ignoreOrder: true,
          },
        ],
      )
    .end()
  }

  // prettier-ignore
  webpackConfig.when(__DEV__, webpackConfig => {
    if (hotload) {
      webpackConfig
        .plugin('webpack.HotModuleReplacementPlugin')
          .use((webpack as any).HotModuleReplacementPlugin)
        .end()
    }
  })
  webpackConfig.when(!__DEV__, webpackConfig => {
    webpackConfig.optimization
      .minimizer('terser-webpack-plugin')
      .use(require.resolve('terser-webpack-plugin'), [
        {
          cache: true,
          parallel: true,
          sourceMap: !!devtool
        }
      ])
      .end()
      .splitChunks({
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
        ...splitChunks
      })
      .runtimeChunk(false)
  })
  // prettier-ignore
  if (!__DEV__ && analyze && analyze.enable) {
    webpackConfig
      .plugin('webpack-bundle-analyzer')
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin,[
          {
            ...analyze.options
          }
        ])
  }
}

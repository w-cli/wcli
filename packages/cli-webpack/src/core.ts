import applyJsLoader from './helper/applyJsLoader'
import applyCssLoader from './helper/applyCssLoader'
import applyOtherLoader from './helper/applyOtherLoader'
import applyPlugin from './helper/applyPlugin'
import applySsr from './helper/applySsr'
import WebpackChain from 'webpack-chain'
import { config, root } from './config'
const webpackConfig = new WebpackChain()

const initConfig = ({ mode }) => {
  const __DEV__ = mode === 'development'
  const src = root('src')

  const {
    entry = {
      app: `${src}/index.${config.tsModule ? 'tsx' : 'js'}`
    },
    assets = 'static',
    extensions = ['.js', '.jsx', '.ts', '.tsx', '.json'],
    output = root('dist'),
    publicPath = './',
    alias = {
      '@': src
    },
    hotload = true,
    devtool,
    ssr = false
  } = config

  entry &&
    Object.keys(entry).forEach(key => {
      const e = webpackConfig.entry(key)
      if (__DEV__ && hotload) {
        e.add(require.resolve('webpack-hot-middleware/client'))
      }
      e.add(entry[key])
    })

  // prettier-ignore
  webpackConfig
    .mode(mode)
    .devtool(devtool || __DEV__ ? 'cheap-module-source-map' : false)
    .output
      .path(output)
      .publicPath(publicPath)
      .filename(`${assets}/js/[name].js`)
      .chunkFilename(`${assets}/js/[name].js`)
      .end()
    .resolve
      //.set('symlinks', true)
      .extensions
        .merge(extensions)
        .end()
      .alias
        .merge(alias)
        .end()

  applyJsLoader(webpackConfig, config, root)
  applyCssLoader(webpackConfig, config)
  applyOtherLoader(webpackConfig)
  applyPlugin(webpackConfig, config, root, __DEV__)
  ssr && applySsr(webpackConfig)

  return webpackConfig
}

export { config, initConfig }

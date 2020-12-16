import tsImportPluginFactory from 'ts-import-plugin'
import { IConfig } from '../config'
export default (
  webpackConfig,
  config: IConfig,
  root: (args?: any) => string
) => {
  const { babelLoader = {}, tsLoader = {}, tsModule = true } = config
  // prettier-ignore
  const rule =  webpackConfig.module
  .rule('js-loader-rule')
    .test(/\.(jsx?|tsx?)$/)
    .include.add(root()).end()
    .exclude.add(/node_modules/).end()
  // prettier-ignore
  rule
    .use('babel-loader')
      .loader(require.resolve('babel-loader'))
      .options({
        babelrc: false,
        configFile: false,
        cacheDirectory: babelLoader.cacheDirectory || true,
        cacheCompression: babelLoader.cacheCompression || false,
        presets: [
          require.resolve('@wcli/babel-preset-app'),
          ...(babelLoader.presets || [])
        ],
        plugins: [...(babelLoader.plugins || [])]
      })
    .end()
  tsModule &&
    rule
      .use('ts-loader')
      .loader(require.resolve('ts-loader'))
      .options({
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
        compilerOptions: { module: 'es2015' },
        ...tsLoader
      })
      .end()
}

import tsImportPluginFactory from 'ts-import-plugin'
import { IConfig } from '../config'
export default (
  webpackConfig,
  config: IConfig,
  root: (args?: any) => string
) => {
  const { babelLoader, tsLoader } = config
  // prettier-ignore
  webpackConfig.module
    .rule('js-rule')
      .test(/\.(jsx?|tsx?)$/)
      .include.add(root()).end()
      .exclude.add(/node_modules/).end()
      .use('babel-loader')
        .loader(require.resolve('babel-loader'))
        .options({
          babelrc: false,
          configFile: false,
          cacheDirectory: true,
          cacheCompression: false,
          presets: [require.resolve('@wcli/babel-preset-app')],
          ...(babelLoader.options || {})
        })
        .end()
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
          ...(tsLoader.options || {})
        })
        .end()
}

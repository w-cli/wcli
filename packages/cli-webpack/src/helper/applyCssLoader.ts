import { IConfig } from '../config'
import { Rule } from 'webpack-chain'
const applyCss = (rule: Rule, config: IConfig, cssModule: boolean) => {
  const { styleLoader, ssr, theme } = config
  //prettier-ignore
  if(styleLoader.enable){
    rule
      .use('style-loader')
      .loader(require.resolve('style-loader'))
      .end()
  }else{
    if(!ssr){
      rule
        .use('mini-css-extract-plugin')
        .loader(require.resolve('mini-css-extract-plugin/dist/loader'))
        .end()
    }
  }
  //prettier-ignore
  rule
    .use('css-loader')
      .loader(require.resolve('css-loader'))
      .options({
        onlyLocals: !!ssr,
        modules: cssModule
          ? {
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          : false
      })
  //prettier-ignore
  rule
    .use('less-loader')
      .loader(require.resolve('less-loader'))
      .options({
        modifyVars: theme || {},
        javascriptEnabled: true
      })
}

export default (webpackConfig, config: IConfig) => {
  const cssRule = webpackConfig.module.rule('css-rule').test(/\.(css|less)$/)
  applyCss(cssRule.oneOf('css-modules').resourceQuery(/modules/), config, true)
  applyCss(cssRule.oneOf('css'), config, false)
}

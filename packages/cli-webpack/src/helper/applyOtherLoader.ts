export default webpackConfig => {
  // prettier-ignore
  webpackConfig.module
  .rule('url-loader')
  .test( /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i)
  .exclude.add(/node_modules/).end()
  .use('url-loader')
    .loader(require.resolve('url-loader'))
      .options({
        limit: 1024,
        name: 'img/[sha512:hash:base64:7].[ext]'
      })
  .end()
}

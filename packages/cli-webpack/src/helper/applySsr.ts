export default webpackConfig => {
  //prettier-ignore
  webpackConfig.output
   .libraryTarget('commonjs2').end()
   .target('node')
   .node
     .set('__dirname', true)
     .set('__filename', true)
     .end()
   .externals([require.resolve('webpack-node-externals')])
}

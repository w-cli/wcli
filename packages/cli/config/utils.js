exports.cssLoader = options => {
  const {
    include,
    exclude,
    extraLoader,
    theme = {},
    otherLoader = [],
    modules = false,
    ssr = false
  } = options
  const loaders = [
    {
      loader: require.resolve('css-loader'),
      options: {
        onlyLocals: !!ssr,
        modules: modules
          ? {
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          : false
      }
    },
    {
      loader: require.resolve('less-loader'),
      options: { modifyVars: theme, javascriptEnabled: true }
    },
    ...otherLoader
  ]
  if (!ssr && extraLoader) loaders.unshift(extraLoader)

  const rule = { test: /\.(css|less)$/, use: loaders }
  if (!!include) rule.include = include
  if (!!exclude) rule.exclude = exclude

  return rule
}

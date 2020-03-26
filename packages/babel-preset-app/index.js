module.exports = function(context, options = {}) {
  const presets = [
    require('@babel/preset-typescript').default,
    [
      require('@babel/preset-env').default,
      {
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
        },
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    require('@babel/preset-react').default
  ]

  const plugins = [
    require('@babel/plugin-syntax-dynamic-import').default,
    [
      require('@babel/plugin-proposal-decorators').default,
      {
        legacy: true
      }
    ],
    [
      require('@babel/plugin-proposal-class-properties').default,
      {
        loose: true
      }
    ],
    require('@babel/plugin-transform-runtime').default,
    require('@babel/plugin-transform-modules-commonjs').default
  ]
  return {
    sourceType: 'unambiguous',
    presets,
    plugins
  }
}

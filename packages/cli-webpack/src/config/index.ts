import { existsSync } from 'fs'
import { join } from 'path'
import _ from 'lodash'

export interface IConfig {
  entry: {}
  port: number
  proxy: {}
  publicPath: string
  assets: string
  extensions: string[]
  output: string
  libraryTarget: string
  library: string
  alias: {}
  hotload: boolean
  analyze: Record<string, any>
  webpackChain: (args: any) => any
  devServer: {}
  devMiddlewareConfig: {}
  htmlWebpackConfig: {}
  devtool: string
  tsModule: boolean
  babelLoader: Record<string, any>
  tsLoader: Record<string, any>
  cssLoader: Record<string, any>
  styleLoader: Record<string, any>
  ssr: boolean
  theme: {}
  templateConfig: {}
  splitChunks: {}
  defines: {}
  dotenvConfig: {}
}

export const root = (name: string = '') => join(process.cwd(), '/', name)
const configFile = ['.wclirc.ts', '.wclirc.js', '.wclirc'].find(f =>
  existsSync(root(f))
)

const customConfig = configFile ? require(root(configFile)) : {}
const entryFile = customConfig.tsModule ? 'index.tsx' : 'index.js'
export const config: IConfig = {
  entry: {
    app: `${root('src')}/${entryFile}`
  },
  assets: 'static',
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  output: root('dist'),
  publicPath: './',
  alias: {
    '@': root('src')
  },
  splitChunks: {},
  hotload: true,
  devtool: '',
  ssr: false,
  libraryTarget: '',
  library: '',
  babelLoader: {},
  tsLoader: {},
  cssLoader: {},
  styleLoader: {},
  tsModule: false,
  proxy: {},
  devMiddlewareConfig: {},
  defines: {},
  dotenvConfig: {},
  analyze: {
    enable: false,
    options: {}
  },
  ...customConfig
}

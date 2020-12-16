import { existsSync } from 'fs'
import { join } from 'path'
import _ from 'lodash'

export interface IConfig {
  entry: Record<string, any>
  port: number
  proxy: any
  publicPath: string
  assets: string
  extensions: string[]
  output: string
  alias: Record<string, any>
  hotload: boolean
  analyze: Record<string, any>
  webpackChain: (args: any) => any
  devServer: Record<string, any>
  devMiddlewareConfig: Record<string, any>
  htmlWebpackConfig: Record<string, any>
  devtool: string
  tsModule: boolean
  babelLoader: Record<string, any>
  tsLoader: Record<string, any>
  cssLoader: Record<string, any>
  styleLoader: Record<string, any>
  ssr: boolean
  theme: Record<string, any>
  templateConfig: Record<string, any>
  splitChunks: Record<string, any>
  defines: Record<string, any>
  versions: Record<string, any>
  [k: string]: any
}

export const root = (name: string = '') => join(process.cwd(), '/', name)
export const CONFIG_FILES = ['.wclirc.ts', '.wclirc.js', '.wclirc']
const getUserConfig = () => {
  const configFile = CONFIG_FILES.find(f => existsSync(root(f)))
  return configFile ? require(root(configFile)) : {}
}

export const config: IConfig = getUserConfig()

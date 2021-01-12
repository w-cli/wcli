import { runDevWebpack, localConfig } from '@wcli/cli-webpack'
const { port: defaultPort } = localConfig

export default async ({ port = defaultPort }) => {
  runDevWebpack({ port })
}

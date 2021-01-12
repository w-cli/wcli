import { runBuildWebpack } from '@wcli/cli-webpack'

export default async ({ type = 'prod' }) => {
  runBuildWebpack({ type })
}

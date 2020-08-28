import { runBuildWebpack, localConfig } from '@wcli/cli-webpack'
import inquirer from 'inquirer'
import { chooseVersion } from './util'

export default async ({ type }) => {
  const { versions = [] } = localConfig
  if (!type) {
    const { version } = await inquirer.prompt(chooseVersion(versions))
    runBuildWebpack({ type: version })
  } else {
    runBuildWebpack({ type })
  }
}
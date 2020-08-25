import { runDevWebpack, localConfig } from '@wcli/cli-webpack'
import inquirer from 'inquirer'
import { chooseVersion } from './util'

export default async ({ port = 8081 }) => {
  const { versions = [] } = localConfig
  const { version } = await inquirer.prompt(chooseVersion(versions))
  runDevWebpack({ port, version })
}

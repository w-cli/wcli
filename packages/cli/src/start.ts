import { runDevWebpack, localConfig } from '@wcli/cli-webpack'
import inquirer from 'inquirer'
import { chooseVersion } from './util'
const { versions = [], port: defaultPort } = localConfig

export default async ({ port = defaultPort }) => {
  const { version } = await inquirer.prompt(chooseVersion(versions))
  runDevWebpack({ port, version })
}

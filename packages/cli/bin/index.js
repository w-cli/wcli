#!/usr/bin/env node
const program = require('commander')
const pkg = require('../package.json')

program.version(pkg.version, '-v, --version')

program
  .command('start')
  .description('start dev')
  .option('-p, --port <port>', 'start dev port')
  .action(require('../lib/start'))

program
  .command('build')
  .description('build package')
  .option('-t, --type <type>', 'build type')
  .action(require('../lib/build'))

program.on('command:*', () => {
  console.error(
    'Invalid command: %s\nSee --help for a list of available commands.',
    program.args.join(' ')
  )
  process.exit(1)
})

program.parse(process.argv)
if (process.argv.length === 2) {
  program.outputHelp()
}

#!/usr/bin/env node
const program = require('commander')
const pkg = require('../package.json')

program.version(pkg.version, '-v, --version')

program
  .command('start')
  .description('start dev')
  .option('-p, --port <port>', 'start dev port')
  .action(require('../lib/start').default)

program
  .command('build')
  .description('build')
  .action(require('../lib/build').default)

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

const path = require('path')
const util = require('util')

const exec = util.promisify(require('shelljs').exec)
const _dir = path.join(__dirname, '../')
const root = name => path.join(process.cwd(), '/', name)
const choices = () => [
  {
    type: 'list',
    name: 'version',
    message: `please select api version`,
    choices: require('../config').envs || ['dev', 'sit']
  }
]

module.exports = {
  exec,
  _dir,
  root,
  choices,
  util
}

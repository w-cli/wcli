// const path = require('path')
// const util = require('util')

// const exec = util.promisify(require('shelljs').exec)
// const _dir = path.join(__dirname, '../')
// const root = name => path.join(process.cwd(), '/', name)

// module.exports = {
//   exec,
//   _dir,
//   root,
//   util
// }

const chooseVersion = versions => [
  {
    type: 'list',
    name: 'version',
    message: `please select api version`,
    choices: versions || ['dev', 'sit']
  }
]

export { chooseVersion }

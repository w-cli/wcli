const chooseVersion = versions => [
  {
    type: 'list',
    name: 'version',
    message: `please select api version`,
    choices: versions || ['dev', 'sit']
  }
]

export { chooseVersion }

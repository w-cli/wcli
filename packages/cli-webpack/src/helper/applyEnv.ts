export const setEnv = (options: Record<string, any>) => {
  options &&
    Object.keys(options).forEach(env => {
      process.env[env] = options[env]
    })
}

export const getEnv = (envs: string[]) => {
  return envs.reduce((env, key) => {
    key && (env[key] = process.env[key])
    return env
  }, {})
}

import { type AppEnv } from './types'

export const APP_ENV: AppEnv = Object.keys(process.env).reduce((acc, curr) => {
  const notAllowed = ['__']

  if (notAllowed.some((pattern) => curr.startsWith(pattern))) return acc

  return { ...acc, [curr]: process.env[curr] }
}, {}) as AppEnv

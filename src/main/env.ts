import { type AppEnv } from './types'

export const APP_ENV: AppEnv = Object.keys(import.meta.env).reduce(
  (acc, curr) => {
    const notAllowed = ['__']

    if (notAllowed.some((pattern) => curr.startsWith(pattern))) return acc

    return { ...acc, [curr]: import.meta.env[curr] }
  },
  {}
) as AppEnv

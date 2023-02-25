import { type AppEnv } from '../types'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends AppEnv {}
  }
}

export {}

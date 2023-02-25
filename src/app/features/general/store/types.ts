export const GENERAL_REDUCER_ACTIONS = {
  CLEAR_STATE: '@general/clearState',
  TOGGLE_DIALOGS: '@general/openDialogs',
  TOGGLE_SNACK: `@general/toggleSnack`,
  STORE_REDIRECT: '@general/storeRedirect',
  STORE_SYSTEM_CONFIG: '@general/storeSystemConfig'
} as const

export const GENERAL_REDUCER_INITIAL_STATE: GeneralState = {
  snackAlert: {},
  activeDialogs: [],
  redirect: {}
}

export type GeneralState = {
  snackAlert: {
    open?: boolean
    message?: string
  }
  activeDialogs: string[]
  redirect: {
    type?: 'external'
    url?: string
  }
}

export type GeneralActionTypes = {
  toggleDialog: {
    action: 'open' | 'close'
    id: string
  }
}

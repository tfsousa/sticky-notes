import { createAction } from '@reduxjs/toolkit'
import {
  type ActionCreatorPayload,
  type ReducerFunction
} from '~/core/store/types'

import { type GeneralState, GENERAL_REDUCER_ACTIONS } from '../types'

export const storeRedirect: ActionCreatorPayload<GeneralState['redirect']> =
  createAction(GENERAL_REDUCER_ACTIONS.STORE_REDIRECT)

export const storeRedirectReducer: ReducerFunction<
  GeneralState,
  GeneralState['redirect']
> = (state, { payload }) => ({
  ...state,
  redirect: { ...payload }
})

import { createAction } from '@reduxjs/toolkit'
import {
  type ActionCreatorPayload,
  type ReducerFunction
} from '~/core/store/types'

import { type GeneralState, GENERAL_REDUCER_ACTIONS } from '../types'

export const toggleSnack: ActionCreatorPayload<GeneralState['snackAlert']> =
  createAction(GENERAL_REDUCER_ACTIONS.TOGGLE_SNACK)

export const toggleSnackReducer: ReducerFunction<
  GeneralState,
  GeneralState['snackAlert']
> = (state, action) => ({
  ...state,
  snackAlert: {
    ...state.snackAlert,
    ...action.payload
  }
})

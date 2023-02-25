import { createAction } from '@reduxjs/toolkit'
import {
  type ActionCreatorPayload,
  type ReducerFunction
} from '~/core/store/types'

import {
  type GeneralState,
  type GeneralActionTypes,
  GENERAL_REDUCER_ACTIONS
} from '../types'

export const toggleDialogs: ActionCreatorPayload<
  GeneralActionTypes['toggleDialog']
> = createAction(GENERAL_REDUCER_ACTIONS.TOGGLE_DIALOGS)

export const toggleDialogsReducer: ReducerFunction<
  GeneralState,
  GeneralActionTypes['toggleDialog']
> = (state, { payload }) => ({
  ...state,
  activeDialogs:
    payload.action === 'open'
      ? [...state.activeDialogs, payload.id]
      : [...state.activeDialogs.filter((id) => id !== payload.id)]
})

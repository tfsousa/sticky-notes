import { createAction } from '@reduxjs/toolkit'
import { type ReducerFunction } from '~/core/store/types'

import {
  type GeneralState,
  GENERAL_REDUCER_ACTIONS,
  GENERAL_REDUCER_INITIAL_STATE
} from '../types'

export const clearState = createAction(GENERAL_REDUCER_ACTIONS.CLEAR_STATE)

export const clearStateReducer: ReducerFunction<GeneralState, void> = () => ({
  ...GENERAL_REDUCER_INITIAL_STATE
})

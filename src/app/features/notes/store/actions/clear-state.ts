import { createAction } from '@reduxjs/toolkit'
import { type ReducerFunction } from '~/core/store/types'

import {
  NOTES_REDUCER_ACTIONS,
  NOTES_REDUCER_INITIAL_STATE,
  type NotesState
} from '../types'

export const clearState = createAction(NOTES_REDUCER_ACTIONS.CLEAR_STATE)

export const clearStateReducer: ReducerFunction<NotesState, void> = () => ({
  ...NOTES_REDUCER_INITIAL_STATE
})

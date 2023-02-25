import { createReducer } from '@reduxjs/toolkit'

import { clearState, clearStateReducer } from './actions'
import { NOTES_REDUCER_INITIAL_STATE } from './types'

export const notesReducer = createReducer(
  NOTES_REDUCER_INITIAL_STATE,
  (builder) => {
    builder.addCase(clearState, clearStateReducer)
  }
)

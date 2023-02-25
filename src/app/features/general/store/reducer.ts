import { createReducer } from '@reduxjs/toolkit'

import {
  clearState,
  clearStateReducer,
  storeRedirect,
  storeRedirectReducer,
  toggleDialogs,
  toggleDialogsReducer,
  toggleSnack,
  toggleSnackReducer
} from './'
import { GENERAL_REDUCER_INITIAL_STATE } from './types'

export const generalReducer = createReducer(
  GENERAL_REDUCER_INITIAL_STATE,
  (builder) => {
    builder.addCase(clearState, clearStateReducer)
    builder.addCase(toggleDialogs, toggleDialogsReducer)
    builder.addCase(toggleSnack, toggleSnackReducer)
    builder.addCase(storeRedirect, storeRedirectReducer)
  }
)

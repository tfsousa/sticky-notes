import { createReducer } from '@reduxjs/toolkit'

import {
  clearState,
  clearStateReducer,
  deleteNote,
  deleteNoteReducer,
  newNote,
  newNoteReducer
} from './actions'
import { updateNote, updateNoteReducer } from './actions/update-note'
import { notesApi } from './api'
import { NOTES_REDUCER_INITIAL_STATE } from './types'

export const notesReducer = createReducer(
  NOTES_REDUCER_INITIAL_STATE,
  (builder) => {
    builder.addCase(clearState, clearStateReducer)
    builder.addCase(deleteNote, deleteNoteReducer)
    builder.addCase(newNote, newNoteReducer)
    builder.addCase(updateNote, updateNoteReducer)

    builder.addMatcher(
      notesApi.endpoints.retrieveUserNotes.matchFulfilled,
      (state, { payload }) => {
        state.notes = payload

        return state
      }
    )
  }
)

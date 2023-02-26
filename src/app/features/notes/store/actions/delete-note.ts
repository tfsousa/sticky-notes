import { createAction } from '@reduxjs/toolkit'
import {
  type ActionCreatorPayload,
  type ReducerFunction
} from '~/core/store/types'

import {
  type NotesActionTypes,
  NOTES_REDUCER_ACTIONS,
  type NotesState
} from '../types'

export const deleteNote: ActionCreatorPayload<NotesActionTypes.DELETE> =
  createAction(NOTES_REDUCER_ACTIONS.DELETE_NOTE)

export const deleteNoteReducer: ReducerFunction<
  NotesState,
  NotesActionTypes.DELETE
> = (state, { payload }) => {
  state.notes[payload] = {}

  if (state.notes.every((note) => !note.id)) {
    state.notes = []
  }

  return state
}

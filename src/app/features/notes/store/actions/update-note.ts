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

export const updateNote: ActionCreatorPayload<NotesActionTypes.UPDATE> =
  createAction(NOTES_REDUCER_ACTIONS.UPDATE_NOTE)

export const updateNoteReducer: ReducerFunction<
  NotesState,
  NotesActionTypes.UPDATE
> = (state, { payload: { index, ...data } }) => {
  state.notes[index] = data

  return state
}

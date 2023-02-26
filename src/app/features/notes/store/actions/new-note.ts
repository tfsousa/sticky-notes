import { faker } from '@faker-js/faker'
import { createAction } from '@reduxjs/toolkit'
import { type ReducerFunction } from '~/core/store/types'

import { NOTES_REDUCER_ACTIONS, type NotesState } from '../types'

export const newNote = createAction(NOTES_REDUCER_ACTIONS.NEW_NOTE)

export const newNoteReducer: ReducerFunction<NotesState, void> = (state) => ({
  ...state,
  notes: [...state.notes, { id: faker.random.alphaNumeric(10) }]
})

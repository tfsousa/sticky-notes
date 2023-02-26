import { type NoteModel } from '../domain'

export const NOTES_REDUCER_ACTIONS = {
  CLEAR_STATE: '@notes/clearState',
  NEW_NOTE: '@notes/new',
  DELETE_NOTE: '@notes/delete',
  UPDATE_NOTE: '@notes/update'
} as const

export const NOTES_REDUCER_INITIAL_STATE: NotesState = {
  notes: []
}

export type NotesState = {
  notes: NoteModel[]
}

export namespace NotesActionTypes {
  export type DELETE = number
  export type NEW = void
  export type UPDATE = NoteModel & {
    index: number
  }
}

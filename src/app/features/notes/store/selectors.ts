import { createSelector } from '@reduxjs/toolkit'
import { type RootState } from '~/core/store/types'

const notesSliceSelector = (state: RootState) => state.notes

export const notesState = createSelector(notesSliceSelector, (state) => state)

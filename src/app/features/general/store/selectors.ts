import { createSelector } from '@reduxjs/toolkit'
import { type RootState } from '~/core/store/types'

const generalSliceSelector = (state: RootState) => state.general

export const generalState = createSelector(
  generalSliceSelector,
  (state) => state
)

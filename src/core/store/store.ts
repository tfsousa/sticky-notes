import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook
} from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { generalReducer } from '~/app/features/general/store'
import { notesReducer } from '~/app/features/notes/store'
import { api } from '~/core/store/api'

import { type AppDispatch, type RootState } from './types'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    general: generalReducer,
    notes: notesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

setupListeners(store.dispatch)

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

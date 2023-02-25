import { api } from '~/core/store'

import {
  type PersistUserNotes,
  persistUserNotesService,
  type RetrieveUserNotes,
  retrieveUserNotesService
} from '../application/services'

export const notesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    persistUserNotes: builder.mutation<
      PersistUserNotes.Response,
      PersistUserNotes.Params
    >({
      query: (params) => ({
        service: persistUserNotesService,
        params
      })
    }),

    retrieveUserNotes: builder.query<
      RetrieveUserNotes.Response,
      RetrieveUserNotes.Params
    >({
      query: (params) => ({
        service: retrieveUserNotesService,
        params
      })
    })
  })
})

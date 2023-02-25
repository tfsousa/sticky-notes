import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryAdapter } from '~/core/store/adapters'

export const api = createApi({
  baseQuery: baseQueryAdapter,
  endpoints: () => ({})
})

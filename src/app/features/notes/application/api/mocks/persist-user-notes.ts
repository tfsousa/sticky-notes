import { rest } from 'msw'

import { NOTES_API_ROUTES } from '../routes'

export const persistUserNotesApiMock = rest.get(
  NOTES_API_ROUTES.NOTES,
  (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        results: {}
      })
    )
)

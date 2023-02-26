import { rest } from 'msw'
import { cacheStorage } from '~/core/infra'

import { NOTES_STORAGE_TOKENS } from '../../../domain'
import { NOTES_API_ROUTES } from '../routes'

export const retrieveUserNotesApiMock = rest.get(
  NOTES_API_ROUTES.RETRIEVE,
  (_req, res, ctx) => {
    const data =
      cacheStorage.get(`${NOTES_STORAGE_TOKENS.USER_NOTES}/test`) ?? []

    return res(ctx.status(200), ctx.json(data))
  }
)

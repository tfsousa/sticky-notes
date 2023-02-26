import { rest } from 'msw'
import { cacheStorage } from '~/core/infra'

import { type NoteModel, NOTES_STORAGE_TOKENS } from '../../../domain'
import { NOTES_API_ROUTES } from '../routes'

export const persistUserNotesApiMock = rest.put(
  NOTES_API_ROUTES.PERSIST,
  async (req, res, ctx) => {
    const token = `${NOTES_STORAGE_TOKENS.USER_NOTES}/test`

    const data = await req.json<{ notes: NoteModel[] }>()

    cacheStorage.set(token, data?.notes ?? [])
    return res(ctx.status(200))
  }
)

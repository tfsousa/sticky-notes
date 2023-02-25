import { type ServiceCommand } from '~/core/domain/command/service-command'
import { cacheStorage, httpClient } from '~/core/infra'

import { NOTES_STORAGE_TOKENS } from '../../../domain'
import { NOTES_API_ROUTES } from '../../api'
import { PersistUserNotes } from './persist-user-notes'

export const persistUserNotesService: ServiceCommand<PersistUserNotes.Response> =
  new PersistUserNotes(
    httpClient,
    NOTES_API_ROUTES.NOTES,
    cacheStorage,
    NOTES_STORAGE_TOKENS.USER_NOTES
  )

export type { PersistUserNotes }

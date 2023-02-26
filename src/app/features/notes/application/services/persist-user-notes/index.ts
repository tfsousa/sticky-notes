import { type ServiceCommand } from '~/core/domain/command/service-command'
import { httpClient } from '~/core/infra'

import { NOTES_API_ROUTES } from '../../api'
import { PersistUserNotes } from './persist-user-notes'

export const persistUserNotesService: ServiceCommand<PersistUserNotes.Response> =
  new PersistUserNotes(httpClient, NOTES_API_ROUTES.NOTES)

export type { PersistUserNotes }

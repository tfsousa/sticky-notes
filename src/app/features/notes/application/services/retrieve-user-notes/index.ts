import { type ServiceCommand } from '~/core/domain/command/service-command'
import { httpClient } from '~/core/infra'

import { NOTES_API_ROUTES } from '../../api'
import { RetrieveUserNotes } from './retrieve-user-notes'

export const retrieveUserNotesService: ServiceCommand<RetrieveUserNotes.Response> =
  new RetrieveUserNotes(httpClient, NOTES_API_ROUTES.NOTES)

export type { RetrieveUserNotes }

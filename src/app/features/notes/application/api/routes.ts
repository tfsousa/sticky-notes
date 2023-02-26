import { makeApiUrl } from '../../../../shared/hooks/make-api-url'

export const NOTES_API_ROUTES = {
  NOTES: makeApiUrl('notes'),
  PERSIST: `${makeApiUrl('notes')}/test`,
  RETRIEVE: `${makeApiUrl('notes')}/test`
}

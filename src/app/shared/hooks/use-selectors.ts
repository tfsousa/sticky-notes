import { generalState } from '~/app/features/general/store'
import { notesState } from '~/app/features/notes/store'
import { useAppSelector } from '~/core/store/store'

export const General = () => useAppSelector(generalState)

export const Notes = () => useAppSelector(notesState)

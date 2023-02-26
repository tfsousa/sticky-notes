import { useCallback, useEffect, useRef } from 'react'

import { useSelectors } from '~/app/shared/hooks'
import { TrashIcon } from '~/app/shared/icons'
import { useAppDispatch } from '~/core/store/store'

import {
  deleteNote,
  newNote,
  useLazyRetrieveUserNotesQuery,
  usePersistUserNotesMutation
} from '../../../store'
import { StickyNote } from '../../components'
import styles from './home.module.scss'

const userId = 'test'

const Home = () => {
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLDivElement>(null)
  const trashZoneRef = useRef<HTMLDivElement>(null)
  const activeDrag = useRef<number>()
  const intersectingTrash = useRef<boolean>(false)

  const [persist] = usePersistUserNotesMutation()
  const [retrieve] = useLazyRetrieveUserNotesQuery()

  const { notes } = useSelectors.Notes()

  const handleAddNote = useCallback(() => {
    dispatch(newNote())
  }, [dispatch])

  const handleSave = useCallback(() => {
    persist({ notes, userId })
  }, [notes, persist])

  const handleLoad = useCallback(() => {
    retrieve({ userId })
  }, [retrieve])

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    if (activeDrag.current !== undefined) {
      e.currentTarget.classList.add(styles.hovering)
      intersectingTrash.current = true
    }
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    if (activeDrag.current !== undefined) {
      e.currentTarget.classList.remove(styles.hovering)
      intersectingTrash.current = false
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (activeDrag.current !== undefined && intersectingTrash.current) {
        e.currentTarget.classList.remove(styles.hovering)
        intersectingTrash.current = false
        dispatch(deleteNote(activeDrag.current))
        activeDrag.current = undefined
      }
    },
    [dispatch]
  )

  useEffect(() => {
    retrieve({ userId })
  }, [retrieve])

  return (
    <div className={styles.container}>
      <h1>Welcome to Sticky Notes!</h1>
      <div>
        <button type='button' className={styles.add} onClick={handleAddNote}>
          + New Note
        </button>
        <button type='button' className={styles.save} onClick={handleSave}>
          Save
        </button>
        <button type='button' className={styles.load} onClick={handleLoad}>
          Load
        </button>
      </div>

      <div ref={ref} className={styles['notes-wrapper']}>
        {notes.map((data, index) => (
          <StickyNote
            key={index}
            index={index}
            {...data}
            activeDrag={activeDrag}
          />
        ))}
        <div
          ref={trashZoneRef}
          className={styles['trash-zone']}
          onMouseEnter={handleDragEnter}
          onMouseLeave={handleDragLeave}
          onMouseUp={handleDrop}
        >
          Trash
          <TrashIcon />
        </div>
      </div>
    </div>
  )
}

export default Home

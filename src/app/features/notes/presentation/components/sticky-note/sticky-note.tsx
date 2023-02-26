import { useCallback, useEffect, useRef, useState } from 'react'

import { useDraggable } from '~/app/shared/hooks'
import { TrashIcon } from '~/app/shared/icons'
import { useAppDispatch } from '~/core/store/store'

import { type NoteModel } from '../../../domain'
import { deleteNote, updateNote } from '../../../store'
import { Resizer } from '../resizer/resizer'
import styles from './sticky-note.module.scss'

type Props = NoteModel & {
  index: number
  activeDrag: React.MutableRefObject<number | undefined>
}

type AvailableColors = 'yellow' | 'blue' | 'green'

export const StickyNote = ({
  left = 0,
  top = 0,
  height = 320,
  width = 240,
  content = '',
  color = 'yellow',
  id,
  index,
  activeDrag
}: Props) => {
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLDivElement>(null)

  const [value, setValue] = useState(content)
  const [currColor, setColor] = useState<AvailableColors>(color)

  const { handleMouseDown, pressed } = useDraggable<HTMLDivElement>({
    ref
  })

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value)
    },
    []
  )

  const handleRemove = useCallback(() => {
    dispatch(deleteNote(index))
  }, [dispatch, index])

  const handleColor = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setColor(e.currentTarget.id as AvailableColors)
    },
    []
  )

  const handleMouseUp = useCallback(() => {
    const el = ref.current

    if (el) {
      dispatch(
        updateNote({
          index,
          content: value,
          id,
          left: el.style.left,
          top: el.style.top,
          height: el.style.height,
          width: el.style.width,
          color: currColor
        })
      )
    }
  }, [currColor, dispatch, id, index, value])

  useEffect(() => {
    handleMouseUp()
  }, [currColor, handleMouseUp])

  useEffect(() => {
    if (pressed) {
      activeDrag.current = index
    }

    if (!pressed && activeDrag.current === index) {
      activeDrag.current = undefined
    }
  }, [activeDrag, index, pressed])

  if (!id) return <></>

  return (
    <div
      ref={ref}
      id={id}
      className={`${styles.container} ${styles[currColor]}`}
      style={{ left, top, height, width }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onBlur={handleMouseUp}
    >
      <textarea
        className={styles.input}
        value={value}
        onChange={handleChange}
      />
      <button className={styles.trash} onClick={handleRemove}>
        <TrashIcon />
      </button>

      <div className={styles.colors}>
        <div
          id='yellow'
          className={`${styles.yellow} ${styles.color}`}
          onClick={handleColor}
        />
        <div
          id='blue'
          className={`${styles.blue} ${styles.color}`}
          onClick={handleColor}
        />
        <div
          id='green'
          className={`${styles.green} ${styles.color}`}
          onClick={handleColor}
        />
      </div>
      <Resizer parentRef={ref} />
    </div>
  )
}

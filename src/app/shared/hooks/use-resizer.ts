import { useCallback, useEffect, useState } from 'react'

type Props<T> = {
  ref: React.RefObject<T>
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  onResize?: (resizing: boolean) => void
}

export const useResizer = <T extends HTMLElement>({
  ref,
  minHeight = 224,
  minWidth = 189,
  maxHeight = 500,
  maxWidth = 500,
  onResize
}: Props<T>) => {
  const [el, setEl] = useState<T | null>(null)
  const [resizing, setResizing] = useState(false)

  const handleMouseUp = useCallback((e: MouseEvent) => {
    e.stopPropagation()
    setEl(null)
    setResizing(false)
  }, [])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation()

      setEl(ref.current)
      setResizing(true)
    },
    [ref]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()

      if (el) {
        const rect = el.getBoundingClientRect()

        const newWidth = rect.width + e.movementX
        const width = () => {
          if (newWidth < minWidth) return minWidth

          if (newWidth > maxWidth) return maxWidth

          return newWidth
        }

        const newHeight = rect.height + e.movementY
        const height = () => {
          if (newHeight < minHeight) return minHeight

          if (newHeight > maxHeight) return maxHeight

          return newHeight
        }

        el.style.width = `${width()}px`
        el.style.height = `${height()}px`
      }
    },
    [el, maxHeight, maxWidth, minHeight, minWidth]
  )

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [el, handleMouseMove, handleMouseUp])

  return { handleMouseDown, resizing }
}

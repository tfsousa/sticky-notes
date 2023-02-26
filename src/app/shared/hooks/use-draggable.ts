import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

type Coordinates = {
  x: number
  y: number
}

type Props<T> = {
  ref: React.RefObject<T>
}

export const useDraggable = <T extends HTMLElement>({ ref }: Props<T>) => {
  const position = useRef({ x: 0, y: 0 })

  const [pressed, setPressed] = useState(false)

  const onDrag = useCallback(
    ({ x, y }: Coordinates) => {
      const rect = ref.current?.getBoundingClientRect()
      const parentRect = ref.current?.parentElement?.getBoundingClientRect()

      if (!rect || !parentRect)
        return {
          x: 0,
          y: 0
        }

      const xPos = () => {
        const rightLimit = parentRect.width - rect.width

        if (x > rightLimit) return rightLimit

        if (x <= 0) return 0

        return x
      }

      const yPos = () => {
        const bottomLimit = parentRect.height - rect.height

        if (y > bottomLimit) return bottomLimit

        if (y <= 0) return 0

        return y
      }

      return {
        x: xPos(),
        y: yPos()
      }
    },

    [ref]
  )

  const handleMouseDown = useCallback(() => {
    const elem = ref.current

    if (elem) {
      position.current = { x: elem.offsetLeft, y: elem.offsetTop }
    }

    setPressed(true)
  }, [ref])

  useEffect(() => {
    if (!pressed) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || !position.current) {
        return
      }

      const pos = position.current

      const elem = ref.current

      position.current = onDrag({
        x: pos.x + e.movementX,
        y: pos.y + e.movementY
      })

      elem.style.left = `${pos.x}px`
      elem.style.top = `${pos.y}px`
    }

    const handleMouseUp = () => {
      const elem = ref.current

      if (elem?.offsetParent) {
        const parentWidth = elem.offsetParent.clientWidth
        const parentHeight = elem.offsetParent.clientHeight

        const pos = position.current

        elem.style.left = `${(pos.x / parentWidth) * 100}%`
        elem.style.top = `${(pos.y / parentHeight) * 100}%`
      }

      setPressed(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [pressed, onDrag, ref])

  return { handleMouseDown, pressed }
}

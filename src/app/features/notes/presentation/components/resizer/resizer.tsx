import { useResizer } from '~/app/shared/hooks'
import { ResizeIcon } from '~/app/shared/icons'

import styles from './resizer.module.scss'

type Props<T> = {
  parentRef: React.RefObject<T>
}

export const Resizer = <T extends HTMLElement>({ parentRef }: Props<T>) => {
  const { handleMouseDown } = useResizer({ ref: parentRef })

  return (
    <div className={styles.container} onMouseDown={handleMouseDown}>
      <ResizeIcon />
    </div>
  )
}

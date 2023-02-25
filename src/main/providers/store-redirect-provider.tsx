import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { storeRedirect } from '~/app/features/general/store'
import { useSelectors } from '~/app/shared/hooks'
import { useAppDispatch } from '~/core/store/store'

type Props = {
  children: React.ReactNode
}

export const StoreRedirectProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { redirect } = useSelectors.General()

  useEffect(() => {
    if (redirect?.url) {
      if (redirect?.type === 'external') {
        window.location.href = redirect.url
      } else {
        navigate({ pathname: redirect.url })
        dispatch(storeRedirect({}))
      }
    }
  }, [dispatch, navigate, redirect])

  return <>{children}</>
}

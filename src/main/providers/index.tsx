import { Provider } from 'react-redux'

import { store } from '~/core/store/store'

import { StoreRedirectProvider } from './store-redirect-provider'

type Props = {
  children?: React.ReactNode
}

export * from './layout-provider'

export const ProviderComposition = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <StoreRedirectProvider>{children}</StoreRedirectProvider>
    </Provider>
  )
}

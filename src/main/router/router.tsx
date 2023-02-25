import {
  BrowserRouter,
  createRoutesFromElements,
  Route,
  useRoutes
} from 'react-router-dom'

import { LayoutProvider, ProviderComposition } from '../providers'
import { appRoutes } from './router-config'

const RouteElements = () => {
  const routes = createRoutesFromElements(
    appRoutes.map(({ layout, element, ...props }, index) => (
      <Route
        key={index}
        index={props?.index}
        action={props?.action}
        caseSensitive={props?.caseSensitive}
        errorElement={props?.errorElement}
        handle={props?.handle}
        hasErrorBoundary={props?.hasErrorBoundary}
        id={props?.id}
        loader={props?.loader}
        path={props?.path}
        shouldRevalidate={props?.shouldRevalidate}
        element={
          <LayoutProvider layoutOptions={layout}>{element}</LayoutProvider>
        }
      />
    ))
  )

  const elements = useRoutes(routes)

  return elements
}

export const Router = () => {
  return (
    <BrowserRouter>
      <ProviderComposition>
        <RouteElements />
      </ProviderComposition>
    </BrowserRouter>
  )
}

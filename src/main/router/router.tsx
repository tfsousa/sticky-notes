import {
  BrowserRouter,
  createRoutesFromElements,
  Route,
  useRoutes
} from 'react-router-dom'

import { LayoutProvider, ProviderComposition } from '../providers'
import { appRoutes } from './router-config'

const RouteElements = () => {
  const getPath = (path?: string) => `${import.meta.env.BASE_URL}${path ?? '/'}`
  const routes = createRoutesFromElements(
    appRoutes.map(({ layout, element, path }, index) => (
      <Route
        key={index}
        path={getPath(path)}
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

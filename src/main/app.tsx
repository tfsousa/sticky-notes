import { Router } from '~/main/router/router'

import { cssReset } from './config'

const App = () => {
  cssReset()

  return <Router />
}

export default App

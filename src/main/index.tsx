import { createRoot } from 'react-dom/client'

import App from './app'
import { worker } from './config/tests/mocks/browser'

if (import.meta.env.DEV) {
  worker.start({ onUnhandledRequest: 'bypass' })
}

const container = document.querySelector('#root')

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)

root.render(<App />)

import '@testing-library/jest-dom/extend-expect'

import { server } from './mocks/server'

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => {
  server.close()
})

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn()
})

process.env.API_URL = 'http://localhost:3000'

Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: jest.fn()
})

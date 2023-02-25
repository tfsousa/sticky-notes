import { type LayoutOptions } from '~/main/types'

declare module 'react-router-dom' {
  interface IndexRouteObject {
    layout?: LayoutOptions
  }

  interface NonIndexRouteObject {
    layout?: LayoutOptions
  }
}

export {}

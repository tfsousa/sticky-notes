import { renderHook } from '@testing-library/react'
import { type CSSObject } from '~/main/types'

import { generateCssString } from './'

describe('Generate Css String', () => {
  it('should return a string containing CSS styles', () => {
    const customCSSObject: CSSObject = { a: { color: 'red' } }

    const {
      result: { current }
    } = renderHook(() => generateCssString(customCSSObject))

    expect(current).toBe('a{color:red}')
  })
})

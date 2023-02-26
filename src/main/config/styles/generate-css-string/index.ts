/**
 * @jest-environment jsdom
 */

import { type CSSObject } from '~/main/types'

export const generateCssString = (cssObject: CSSObject): string => {
  const cssSelectors = Object.keys(cssObject)

  return cssSelectors
    .map((selector) => {
      const stylesParams = cssObject[selector]

      if (selector.startsWith('@import') && Array.isArray(stylesParams)) {
        const result = stylesParams
          .map((importItem) => `@import ${importItem}`)
          .join(';\n')

        return `${result};`
      }

      const styles = Object.entries(stylesParams)

      const result = styles
        .map(
          (style) =>
            `${style[0].replace(/[A-Z]/g, '-$&').toLowerCase()}:${style[1]}`
        )
        .join(';')

      return `${selector}{${result}}`
    })
    .join('\n')
}

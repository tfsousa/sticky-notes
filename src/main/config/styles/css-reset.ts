import { generateCssString } from './generate-css-string'

export const cssReset = () => {
  const cssResetObject = {
    '@import': [
      "url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap')"
    ],

    '*, *:before, *:after': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: 'Ubuntu'
    },

    '*::-webkit-scrollbar': {
      width: '6px'
    },

    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#bdbdbd',
      borderRadius: '8px',
      backgroundClip: 'padding-box'
    },

    html: {
      boxSizing: 'border-box',
      fontSize: '16px',
      lineHeight: 1.15,
      '-webkit-text-size-adjust': '100%'
    },

    body: {
      padding: 0,
      margin: 0,
      height: '100vh',
      overflow: 'hidden'
    },

    '#root': {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'auto'
    },

    main: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      padding: '1rem',
      margin: '0 auto'
    },

    hr: {
      boxSizing: 'content-box',
      height: 0,
      overflow: 'visible'
    },

    a: {
      textDecoration: 'none'
    },

    'abbr[title]': {
      borderBottom: 'none',
      textDecoration: 'underline dotted'
    },

    'b, strong': {
      fontWeight: 'bolder'
    },

    'button, [type=`button`],[type=`reset`], [type=`submit`]': {
      '-webkit-appearance': 'button'
    },

    '[hidden]': {
      display: 'none'
    }
  }

  const resetTag = document.createElement('style')

  resetTag.innerHTML = generateCssString(cssResetObject)

  resetTag.id = 'css-reset'
  resetTag.title = 'css-reset'

  document.head.appendChild(resetTag)
}

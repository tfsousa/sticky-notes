export const customCSSReset = {
  html: {
    boxSizing: 'border-box'
  },
  '*, *:before, *:after': {
    fontFamily: 'Montserrat',
    boxSizing: 'inherit'
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
    height: '100%'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    margin: '0'
  }
}

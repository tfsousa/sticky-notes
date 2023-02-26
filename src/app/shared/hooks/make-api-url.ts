export const makeApiUrl = (route: string) =>
  `${import.meta.env.API_URL as string}/${route}`

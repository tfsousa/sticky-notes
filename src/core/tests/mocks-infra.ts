import { HttpStatusCode } from '~/core/application/protocols'

export const mockHttpClientSpy = (
  response: {
    statusCode: number
  } = {
    statusCode: HttpStatusCode.OK
  }
) => {
  const httpClientSpy = {
    request: jest.fn()
  }
  httpClientSpy.request.mockResolvedValue(response)
  return httpClientSpy
}

export const mockCacheStorageSpy = (getResponse?: Record<string, any>) => {
  const cacheStorageSpy = {
    set: jest.fn(),
    get: jest.fn()
  }
  if (getResponse) {
    cacheStorageSpy.get.mockReturnValue(getResponse)
  }
  return cacheStorageSpy
}

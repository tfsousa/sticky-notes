import { faker } from '@faker-js/faker/locale/pt_BR'
import { RequestResponse } from '~/core/application/http-response/http-response'
import { HttpMethod } from '~/core/application/protocols'
import { error, success } from '~/core/domain/either/either'
import { mockCacheStorageSpy, mockHttpClientSpy } from '~/core/tests'

import { RetrieveUserNotes } from './retrieve-user-notes'

const makeSut = () => {
  const requestResponseHandleSpy = jest.fn().mockImplementation(() => ({
    isError: () => false,
    value: {}
  }))
  RequestResponse.handle = requestResponseHandleSpy
  const httpClientSpy = mockHttpClientSpy()
  const cacheStorageSpy = mockCacheStorageSpy()
  const tokenKey = faker.random.word()
  const url = faker.internet.url()
  const sut = new RetrieveUserNotes(httpClientSpy, url)
  return {
    requestResponseHandleSpy,
    httpClientSpy,
    cacheStorageSpy,
    tokenKey,
    url,
    sut
  }
}

describe('RetrieveUserNotes', () => {
  afterAll(() => {
    jest.useFakeTimers().restoreAllMocks()
  })

  it('should return the stored data', async () => {
    const { cacheStorageSpy, sut } = makeSut()
    const recentDate = faker.date.recent(2)
    cacheStorageSpy.get.mockReturnValueOnce({
      updatedDate: recentDate.getTime()
    })

    const userId = faker.random.alphaNumeric(10)

    const response = await sut.execute({ userId })

    expect(response).toEqual(success(undefined))
  })

  it('Should call httpClient with correct values', async () => {
    const { sut, url, httpClientSpy } = makeSut()

    const userId = faker.random.alphaNumeric(10)
    const apiUrl = `${url}/${userId}`

    await sut.execute({ userId })

    expect(httpClientSpy.request).toHaveBeenCalledWith({
      method: HttpMethod.GET,
      url: apiUrl
    })
  })

  it('Should return error() if RequestResponse fails', async () => {
    const { sut, requestResponseHandleSpy } = makeSut()

    requestResponseHandleSpy.mockReturnValueOnce(error('any_error'))

    const userId = faker.random.alphaNumeric(10)

    const response = await sut.execute({ userId })

    expect(response).toEqual(error('any_error'))
  })

  it('Should return success() with correct values', async () => {
    const { sut } = makeSut()

    const userId = faker.random.alphaNumeric(10)

    const response = await sut.execute({ userId })

    expect(response).toEqual(success(undefined))
  })
})

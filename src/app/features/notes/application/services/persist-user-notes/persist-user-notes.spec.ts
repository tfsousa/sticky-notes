import { faker } from '@faker-js/faker/locale/pt_BR'
import { RequestResponse } from '~/core/application/http-response/http-response'
import { HttpMethod } from '~/core/application/protocols'
import { mockCacheStorageSpy, mockHttpClientSpy } from '~/core/tests'

import { PersistUserNotes } from './persist-user-notes'

const makeSut = () => {
  const requestResponseHandleSpy = jest.fn().mockImplementation(() => ({
    isError: () => false,
    value: {}
  }))
  RequestResponse.handle = requestResponseHandleSpy
  const httpClientSpy = mockHttpClientSpy()
  const url = faker.internet.url()
  const cacheStorageSpy = mockCacheStorageSpy()
  const tokenKey = faker.random.word()

  const notesMock = [{}]

  const sut = new PersistUserNotes(
    httpClientSpy,
    url,
    cacheStorageSpy,
    tokenKey
  )

  return {
    requestResponseHandleSpy,
    httpClientSpy,
    url,
    sut,
    cacheStorageSpy,
    tokenKey,
    notesMock
  }
}

describe('PersistUserNotes', () => {
  afterAll(() => {
    jest.useFakeTimers().restoreAllMocks()
  })

  it('Should call httpClient with correct values', async () => {
    const { sut, url, httpClientSpy, notesMock } = makeSut()

    const userId = faker.random.alphaNumeric(10)
    const apiUrl = `${url}/${userId}`

    await sut.execute({ userId, notes: notesMock })

    expect(httpClientSpy.request).toHaveBeenCalledWith({
      method: HttpMethod.PUT,
      url: apiUrl
    })
  })

  it('Should call cacheStorage.set() with correct values', async () => {
    const { sut, tokenKey, cacheStorageSpy, notesMock } = makeSut()

    const userId = faker.random.alphaNumeric(10)
    const token = `${tokenKey}/${userId}`

    await sut.execute({ userId, notes: notesMock })

    expect(cacheStorageSpy.set).toHaveBeenCalledWith(
      token,
      JSON.stringify(notesMock)
    )
  })
})

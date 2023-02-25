import { faker } from '@faker-js/faker/locale/pt_BR'
import axios from 'axios'
import { HttpMethod } from '~/core/application/protocols'
import { APP_ENV } from '~/main/env'

import { AxiosHttpClientAdapter } from './axios-http-client-adapter'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const mockHttpRequest = () => ({
  method: faker.helpers.arrayElement(Object.values(HttpMethod)),
  url: `${APP_ENV.API_URL}/${faker.internet.domainWord()}`,
  body: JSON.parse(faker.datatype.json()),
  headers: JSON.parse(faker.datatype.json()),
  queryParams: JSON.parse(faker.datatype.json())
})

const mockAxiosResponse = (
  status: number = faker.datatype.number({ min: 200, max: 299 })
) => ({
  status,
  data: JSON.parse(faker.datatype.json())
})

const mockAxiosError = () => ({
  response: {
    data: JSON.parse(faker.datatype.json()),
    status: faker.random.word(),
    statusText: faker.lorem.sentence()
  }
})

const makeSut = () => {
  mockedAxios.create.mockReturnValue(mockedAxios)
  const axiosResponse = mockAxiosResponse()
  mockedAxios.request.mockResolvedValue(axiosResponse)
  const sut = new AxiosHttpClientAdapter()
  return { sut, axiosResponse }
}

describe('AxiosHttpClientAdapter', () => {
  it('Should return correct object on success', async () => {
    const httpRequest = mockHttpRequest()
    const { sut, axiosResponse } = makeSut()

    const response = await sut.request(httpRequest)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: httpRequest.url,
      data: httpRequest.body,
      headers: httpRequest.headers,
      method: httpRequest.method,
      params: httpRequest.queryParams
    })
    expect(response).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })

  it('Should return correct error object on failure', async () => {
    const axiosError = mockAxiosError()
    mockedAxios.request.mockRejectedValueOnce(axiosError)
    const { sut } = makeSut()

    const response = await sut.request(mockHttpRequest())

    expect(response).toEqual({
      error: axiosError.response?.data,
      statusCode: axiosError.response?.status,
      message: axiosError.response?.statusText
    })
  })
})

import type { HttpClient } from '~/core/application/protocols'

import { AxiosHttpClientAdapter } from './axios-http-client-adapter'

export const httpClient: HttpClient = new AxiosHttpClientAdapter()

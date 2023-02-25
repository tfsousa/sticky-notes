import { RequestResponse } from '~/core/application/http-response/http-response'
import type { CacheStorage, HttpClient } from '~/core/application/protocols'
import { HttpMethod } from '~/core/application/protocols'
import { type ServiceCommand } from '~/core/domain/command/service-command'
import { error, success } from '~/core/domain/either/either'

export class PersistUserNotes
  implements ServiceCommand<PersistUserNotes.Response>
{
  constructor(
    private readonly httpClient: HttpClient<PersistUserNotes.Response>,
    private readonly url: string,
    private readonly cacheStorage: CacheStorage,
    private readonly tokenKey: string
  ) {}

  async execute({
    userId,
    notes
  }: PersistUserNotes.Params): Promise<
    ServiceCommand.Response<PersistUserNotes.Response>
  > {
    const url = `${this.url}/${userId}`
    const token = `${this.tokenKey}/${userId}`

    const httpResponse = await this.httpClient.request({
      method: HttpMethod.PUT,
      url
    })

    const responseOrError = RequestResponse.handle(httpResponse)

    if (responseOrError.isError()) {
      return error(responseOrError.value)
    }

    const response = responseOrError.value.response

    this.cacheStorage.set(token, JSON.stringify(notes))

    return success(response)
  }
}

export namespace PersistUserNotes {
  export type Params = {
    userId: string
    notes: any[]
  }

  export type Response = void
}

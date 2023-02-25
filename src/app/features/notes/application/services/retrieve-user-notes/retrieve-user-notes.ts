import { RequestResponse } from '~/core/application/http-response/http-response'
import type { HttpClient } from '~/core/application/protocols'
import { HttpMethod } from '~/core/application/protocols'
import { type ServiceCommand } from '~/core/domain/command/service-command'
import { error, success } from '~/core/domain/either/either'

export class RetrieveUserNotes
  implements ServiceCommand<RetrieveUserNotes.Response>
{
  constructor(
    private readonly httpClient: HttpClient<RetrieveUserNotes.Response>,
    private readonly url: string
  ) {}

  async execute({
    userId
  }: RetrieveUserNotes.Params): Promise<
    ServiceCommand.Response<RetrieveUserNotes.Response>
  > {
    const url = `${this.url}/${userId}`

    const httpResponse = await this.httpClient.request({
      method: HttpMethod.GET,
      url
    })

    const responseOrError = RequestResponse.handle(httpResponse)

    if (responseOrError.isError()) {
      return error(responseOrError.value)
    }

    const response = responseOrError.value.response

    return success(response)
  }
}

export namespace RetrieveUserNotes {
  export type Params = {
    userId: string
  }

  export type Response = any
}

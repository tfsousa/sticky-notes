import { RequestResponse } from '~/core/application/http-response/http-response'
import { HttpMethod, type HttpClient } from '~/core/application/protocols'
import { type ServiceCommand } from '~/core/domain/command/service-command'
import { error, success } from '~/core/domain/either/either'

import { type NoteModel } from '../../../domain'

export class PersistUserNotes
  implements ServiceCommand<PersistUserNotes.Response>
{
  constructor(
    private readonly httpClient: HttpClient<PersistUserNotes.Response>,
    private readonly url: string
  ) {}

  async execute({
    userId,
    notes
  }: PersistUserNotes.Params): Promise<
    ServiceCommand.Response<PersistUserNotes.Response>
  > {
    const url = `${this.url}/${userId}`

    const httpResponse = await this.httpClient.request({
      method: HttpMethod.PUT,
      url,
      body: { notes }
    })

    const responseOrError = RequestResponse.handle(httpResponse)

    if (responseOrError.isError()) {
      return error(responseOrError.value)
    }

    const response = responseOrError.value.response

    return success(response)
  }
}

export namespace PersistUserNotes {
  export type Params = {
    userId: string
    notes: NoteModel[]
  }

  export type Response = void
}

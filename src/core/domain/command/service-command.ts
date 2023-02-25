import { type Either } from '~/core/domain/either/either'
import { type DomainException } from '~/core/domain/exceptions'

export interface ServiceCommand<R = any, T = any> {
  execute: (params: T) => Promise<ServiceCommand.Response<R>>
}

export namespace ServiceCommand {
  export type Response<R = any> = Either<ResponseError, R>
  export type ResponseError<E = DomainException> = E
}

import { type BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import { type ServiceCommand } from '~/core/domain/command/service-command'
import { type DomainException } from '~/core/domain/exceptions'

const logError = (error: any) => {
  import.meta.env.DEV && console.error(error)
}

export const baseQueryAdapter: BaseQueryFn<
  {
    service: ServiceCommand
    params?: any
  },
  any,
  DomainException
> = async ({ service, params }) => {
  try {
    const result = await service.execute(params)
    if (result.isError()) {
      logError(result.value)
      return {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        error: {
          type: result.value.type,
          message: result.value.message,
          error: result.value.error
        } as DomainException
      }
    }
    return { data: result.value }
  } catch (error: any) {
    logError(error)
    return {
      error: {
        type: error.name,
        message: error.message,
        error: error.stack
      }
    }
  }
}

import { FaunaHttpErrorResponseContent } from 'faunadb'

export type ApiResult<T> = Promise<
  { data: T } | { data: null; errors: Error[] }
>

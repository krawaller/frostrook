import { Client } from 'faunadb'

export const makeClient = (opts: { secret: string; domain: string }) =>
  new Client(opts)

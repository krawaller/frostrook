import { Collection, CreateCollection, CreateIndex } from 'faunadb'
import { Executor } from '../utils'

export const setupRateLimit = async (exec: Executor) => {
  await exec(
    CreateCollection({ name: 'rate_limiting' }),
    'rate_limiting collection'
  )

  await exec(
    CreateIndex({
      name: 'all_rate_limiting',
      source: Collection('rate_limiting'),
      // this is the default collection index, no terms or values are provided
      // which means the index will sort by reference and return only the reference.
      // For rate-limiting it's important to set serialized to true.
      // Else a few fast queries might get through the rate-limiting since our
      // index would not immediately see the previous writes.
      serialized: true,
    }),
    'all_rate_limiting index'
  )

  await exec(
    CreateIndex({
      name: 'rate_limiting_by_action_and_identity',
      source: Collection('rate_limiting'),
      // We will search on a key, e.g. the type of actions we want to rate limit
      terms: [
        {
          field: ['data', 'action'],
        },
        {
          field: ['data', 'identity'],
        },
      ],
      // if no values are added, the index will just return the reference.
      // unique: true,
      serialized: true,
    }),
    'rate_limiting_by_action_and_identity index'
  )
}

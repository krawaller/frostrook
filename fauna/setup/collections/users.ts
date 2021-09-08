import { Collection, CreateCollection, CreateIndex } from 'faunadb'
import { Executor } from '../utils'

export const setupUsers = async (exec: Executor) => {
  await exec(CreateCollection({ name: 'users' }), 'users collection')

  await exec(
    CreateIndex({
      name: 'all_users',
      source: Collection('users'),
      // this is the default collection index, no terms or values are provided
      // which means the index will sort by reference and return only the reference.
      serialized: true,
    }),
    'all_users index'
  )

  await exec(
    CreateIndex({
      name: 'users_by_alias',
      source: Collection('users'),
      // We will search on the alias
      terms: [
        {
          field: ['data', 'alias'],
        },
      ],
      // no values are added, we'll just return the reference.
      // unique prevents that two users have the same alias!
      unique: true,
      serialized: true,
    }),
    'users_by_alias index'
  )
}

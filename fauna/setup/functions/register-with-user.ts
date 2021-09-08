import { Collection, Index, Lambda, Query, Role, Var } from 'faunadb'
import { RegisterWithUserInner } from './register-with-user-inner'
import { CreateOrUpdateFunction, CreateOrUpdateRole, Executor } from '../utils'

export const setupRegisterWithUser = async (exec: Executor) => {
  // The register function which creates users immediately
  // also needs to be able to create users.
  await exec(
    CreateOrUpdateRole({
      name: 'functionrole_register_with_user',
      privileges: [
        {
          resource: Collection('accounts'),
          actions: { create: true, read: true },
        },
        {
          resource: Collection('users'),
          actions: { create: true },
        },
        {
          resource: Collection('rate_limiting'),
          actions: {
            read: true,
            write: true,
            create: true,
            history_read: true,
            delete: true,
          },
        },
        {
          resource: Index('rate_limiting_by_action_and_identity'),
          actions: { read: true },
        },
      ],
    }),
    'functionrole_register_with_user role'
  )

  await exec(
    CreateOrUpdateFunction({
      name: 'register_with_user',
      body: Query(
        Lambda(
          ['email', 'password', 'name'],
          RegisterWithUserInner(Var('email'), Var('password'), Var('name'))
        )
      ),
      role: Role('functionrole_register_with_user'),
    }),
    'register_with_user UDF'
  )
}

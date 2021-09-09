import { Collection, Index, Lambda, Query, Role, Var } from 'faunadb'
import { CreateOrUpdateFunction, CreateOrUpdateRole, Executor } from '../utils'
import { LoginAccountInner } from './login-account-inner'

export const setupLoginAccount = async (exec: Executor) => {
  await exec(
    // The login function only needs to be able to Login into accounts with the 'Login' FQL function.
    // That FQL function requires a reference and we will get the account reference with an index.
    // Therefore it needs read access to the 'accounts_by_email' index. Afterwards it will return the
    // account so the frontend has the email of the user so we also need read access to the 'accounts' collection
    CreateOrUpdateRole({
      name: 'functionrole_login',
      privileges: [
        {
          resource: Index('accounts_by_email'),
          actions: { read: true },
        },
        {
          resource: Collection('accounts'),
          actions: { read: true },
        },
        {
          resource: Collection('users'),
          actions: { read: true },
        },
        {
          resource: Collection('rate_limiting'),
          actions: {
            write: true,
            history_read: true,
            create: true,
            read: true,
            delete: true,
          },
        },
        {
          resource: Index('rate_limiting_by_action_and_identity'),
          actions: { read: true },
        },
      ],
    }),
    'functionrole_login role'
  )

  await exec(
    CreateOrUpdateFunction({
      name: 'login',
      body: Query(
        Lambda(
          ['email', 'password'],
          LoginAccountInner(Var('email'), Var('password'))
        )
      ),
      role: Role('functionrole_login'),
    }),
    'login function'
  )
}

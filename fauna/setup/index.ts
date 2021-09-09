import { Client } from 'faunadb'
import { setupAccounts } from './collections/accounts'
import { setupRateLimit } from './collections/rate_limit'
import { setupUsers } from './collections/users'
import { setupLoginAccount } from './functions/login-account'
import { setupRegisterWithUser } from './functions/register-with-user'
import { setupAnonymousUsers } from './memberships/anonymous-users'
import { setupLoggedInUsers } from './memberships/logged-in-users'
import { makeExecutor } from './utils'

export async function setup(client: Client) {
  const exec = makeExecutor(client)
  try {
    await setupRateLimit(exec)
    await setupAccounts(exec)
    await setupUsers(exec)
    await setupRegisterWithUser(exec)
    await setupLoginAccount(exec)
    await setupAnonymousUsers(exec)
    await setupLoggedInUsers(exec)
  } catch (err) {
    console.log('BOOM', err)
    throw err
  }
}

import { Client } from 'faunadb'
import { makeClient } from '../make-client'
import { setupAccounts } from './collections/accounts'
import { setupRateLimit } from './collections/rate_limit'
import { setupUsers } from './collections/users'
import { setupLoginAccount } from './functions/login-account'
import { setupRegisterWithUser } from './functions/register-with-user'
import { makeExecutor } from './utils'

async function setup(client: Client) {
  const exec = makeExecutor(client)
  try {
    await setupRateLimit(exec)
    await setupAccounts(exec)
    await setupUsers(exec)
    await setupRegisterWithUser(exec)
    await setupLoginAccount(exec)
  } catch (err) {
    console.log('BOOM', err)
    throw err
  }
}

setup(
  makeClient({
    secret: process.env.FAUNA_ADMIN_KEY,
    domain: process.env.FAUNA_DOMAIN,
  })
)

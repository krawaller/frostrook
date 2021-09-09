import { join } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { CreateKey, Function, Role } from 'faunadb'
import envfile from 'envfile'
import { CreateOrUpdateRole, Executor } from '../utils'

export const setupAnonymousUsers = async (exec: Executor) => {
  await exec(
    CreateOrUpdateRole({
      name: 'membershiprole_anon',
      privileges: [
        {
          resource: Function('login'),
          actions: {
            call: true,
          },
        },
        {
          resource: Function('register_with_user'),
          actions: {
            call: true,
          },
        },
      ],
    }),
    'membershiprole_anon role'
  )

  // ------- Set up key for anonymous user --------
  if (process.env.FAUNA_ANON_KEY.match(/populated by setup script/)) {
    const envPath = join(process.cwd(), process.env.ENV_FILE_NAME)
    const env = envfile.parse(readFileSync(envPath).toString())
    if (!env.FAUNA_ADMIN_KEY) {
      console.log(env)
      throw new Error('Failed to find proper .env file')
    }
    const clientKey = await exec(
      CreateKey({
        role: Role('membershiprole_anon'),
        data: {
          name: 'anonymous_user_key',
        },
      }),
      'token - bootstrap'
    )
    if (!clientKey?.secret) {
      throw new Error('Failed to get anon token')
    }
    env.FAUNA_ANON_KEY = clientKey.secret
    writeFileSync(envPath, envfile.stringify(env))
  }
}

import { Call, Client, Function, errors } from 'faunadb'
import { ApiResult } from '../api-types'
import { flattenDataKeys } from '../flatten-data-keys'
import { flattenErrors } from '../flatten-errors'
import { LoginResult } from './auth-types'

/* ********** Call the UDF login function *********** */

export async function login(
  client: Client,
  email: string,
  password: string
): ApiResult<LoginResult> {
  try {
    const res = (await client.query(
      Call(Function('login'), email, password)
    )) as unknown
    if (res === false) {
      return { data: null, errors: [new Error('Invalid credentials')] }
    }
    const loginRes = flattenDataKeys(res) as unknown as LoginResult
    return { data: loginRes }
  } catch (err) {
    return {
      data: null,
      errors: flattenErrors(err.requestResult?.responseContent?.errors, {
        'Rate limiting exceeded for this user/action':
          'Too many faulty logins, please wait a while',
      }),
    }
  }
}

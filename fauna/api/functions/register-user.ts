import { Call, Client, Function } from 'faunadb'
import { ApiResult } from '../api-types'
import { flattenDataKeys } from '../flatten-data-keys'
import { flattenErrors } from '../flatten-errors'
import { LoginResult } from './auth-types'

/* ********** Call the UDF register function *********** */
export async function registerWithUser(
  client: Client,
  email: string,
  password: string,
  name: string
): ApiResult<LoginResult> {
  try {
    const res = await client.query(
      Call(Function('register_with_user'), email, password, name)
    )
    return {
      data: flattenDataKeys(res) as unknown as LoginResult,
    }
  } catch (err) {
    return {
      data: null,
      errors: flattenErrors(err.requestResult?.responseContent?.errors, {
        'instance not unique': 'That email is already used to register',
      }),
    }
  }
}

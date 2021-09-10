import { Call, Client, Function } from 'faunadb'
import { flattenDataKeys } from '../flatten-data-keys'

/* ********** Call the UDF register function *********** */
export async function registerWithUser(
  client: Client,
  email: string,
  password: string,
  name: string
) {
  const res = await client.query(
    Call(Function('register'), email, password, name)
  )
  return flattenDataKeys(res) as unknown as { secret: string }
}

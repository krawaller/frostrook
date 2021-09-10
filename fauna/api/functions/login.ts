import { Call, Client, Function } from 'faunadb'
import { flattenDataKeys } from '../flatten-data-keys'

/* ********** Call the UDF login function *********** */

export async function login(client: Client, email: string, password: string) {
  const res = await client.query(Call(Function('login'), email, password))
  return flattenDataKeys(res) as unknown as {
    secret: string
  }
}

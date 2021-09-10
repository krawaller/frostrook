import { Client, Logout } from 'faunadb'

export async function logout(client: Client) {
  const res = await client.query(Logout(true))
  return res
}

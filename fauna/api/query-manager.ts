import faunadb, { Call, Client } from 'faunadb'
import { login } from './functions/login'
import { logout } from './functions/logout'
import { registerWithUser } from './functions/register-user'

/* Initialize the client to contact FaunaDB
 * The client is initially started with the a 'BOOTSTRAP' token.
 * This token has only two permissions, call the 'login' and 'register' User Defined Function (UDF)
 * If the login function succeeds, it will return a new token with elevated permission.
 * The client will then be replaced with a client that uses the secret that was returned by Login.
 */

export class QueryManager {
  client: Client
  headers: Record<string, string>
  constructor(private bootstrapToken: string, private domain: string) {
    // A client is just a wrapper, it does not create a persitant connection
    // FaunaDB behaves like an API and will include the token on each request.
    this.headers = { 'X-Fauna-Source': 'fwitter-react' }
    this.bootstrapToken = bootstrapToken || process.env.FAUNA_ANON_KEY
    this.client = new faunadb.Client({
      headers: this.headers,
      secret: bootstrapToken,
      domain,
    })
  }

  async login(email: string, password: string) {
    const res = await login(this.client, email, password)
    if (res.data) {
      this.client = new faunadb.Client({
        headers: this.headers,
        secret: res.data.secret,
        domain: this.domain,
      })
    }
    return res
  }

  async register(email: string, password: string, name: string) {
    const res = await registerWithUser(this.client, email, password, name)
    if (res.data) {
      this.client = new faunadb.Client({
        headers: this.headers,
        secret: res.data.secret,
        domain: this.domain,
      })
    }
    return res
  }

  async logout() {
    const res = await logout(this.client)
    this.client = new faunadb.Client({
      headers: this.headers,
      secret: this.bootstrapToken,
      domain: this.domain,
    })
    return res
  }
}

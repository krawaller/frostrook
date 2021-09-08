import {
  Delete,
  Do,
  Expr,
  Get,
  Identify,
  If,
  Index,
  IsEmpty,
  Let,
  Login,
  Match,
  Paginate,
  Select,
  Var,
} from 'faunadb'
import { AddRateLimiting } from '../utils'

export function LoginAccountInner(email: Expr, password: Expr) {
  const expr = If(
    Identify(Match(Index('accounts_by_email'), email), password),
    Do(
      // If there was a rate limit set, clear it since we logged in successfully
      Let(
        {
          rateLimitingPage: Paginate(
            Match(Index('rate_limiting_by_action_and_identity'), 'login', email)
          ),
        },
        If(
          // Check whether there is a value
          IsEmpty(Var('rateLimitingPage')),
          true,
          Delete(Select([0], Var('rateLimitingPage')))
        )
      ),
      // And log in!
      Let(
        {
          // Login will return a token if the password matches the credentials that were provided on register.
          // Note that this FQL statement excepts two variables to exist: 'email', 'password'
          res: Login(Match(Index('accounts_by_email'), email), {
            password,
          }),
          // We will return both the token as some account/user information.
          account: Get(Select(['instance'], Var('res'))),
          user: Get(Select(['data', 'user'], Var('account'))),
          secret: Select(['secret'], Var('res')),
        },
        { account: Var('account'), user: Var('user'), secret: Var('secret') }
      )
    ),
    // If unsuccesfull.. we don't need to do anything special, just return false is fine.
    false
  )

  // The rate limiting config for login contains calls: 3 and perSeconds: 0 (see './rate-limiting.js)
  // 0 means that there is no decay, no matter how long you wait you can do maximum 3 calls.
  // But on successful login we clean up the rate-limiting so they only remain on failed logins.
  return AddRateLimiting('login', email, expr)
}

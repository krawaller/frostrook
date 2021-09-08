import { Collection, Create, Expr, Let, Login, Select, Var } from 'faunadb'
import { AddRateLimiting, ValidateEmail, ValidatePassword } from '../utils'

/* Register Example4 - let's extend it to do e-mail validation 
   And follow ourselves at the moment we create the user 
   since you only see the feed of the people you follow */
export function RegisterWithUserInner(email: Expr, password: Expr, name: Expr) {
  // It's always a good idea to use If for such validations compared to Do since Do is not short-circuited at this point
  // at the read-phase, which means that you will incur more reads.

  // We do not have an identity yet here so we add a global rate limit instead of Identity based
  return ValidateEmail(
    email,
    ValidatePassword(
      password,
      AddRateLimiting(
        'register',
        'global',
        Let(
          {
            user: Create(Collection('users'), {
              data: {
                name: name,
                hash: email, // TODO hash this!
              },
            }),
            account: Select(
              ['ref'],
              Create(Collection('accounts'), {
                credentials: { password },
                data: {
                  email: email,
                  user: Select(['ref'], Var('user')),
                },
              })
            ),
            // We don't ask verification of the e-mail so we might as well login the user directly.
            secret: Login(Var('account'), { password }),
          },
          // return user and account
          { user: Var('user'), account: Var('account'), secret: Var('secret') }
        )
      )
    )
  )
}

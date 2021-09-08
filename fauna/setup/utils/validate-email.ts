import { Abort, ContainsStrRegex, Expr, If } from 'faunadb'

export const ValidateEmail = (email: Expr, whenValid: Expr) =>
  If(
    ContainsStrRegex(
      email,
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    ),
    // If it's valid, we continue
    whenValid,
    // Else we Abort!
    Abort('Invalid e-mail provided')
  )

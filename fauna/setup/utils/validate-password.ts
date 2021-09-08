import { Abort, Expr, GTE, If, Length } from 'faunadb'

export const ValidatePassword = (password: Expr, whenValid: Expr) =>
  If(
    GTE(Length(password), 8),
    // If it's valid, we continue
    whenValid,
    // Else we Abort!
    Abort('Invalid password, please provided at least 8 chars')
  )

import { CreateFunction, Function, Exists, Expr, If, Update } from 'faunadb'

// A convenience function to either create or update a function.
export function CreateOrUpdateFunction({
  name,
  role,
  body,
}: {
  name: string
  role: Expr
  body: Expr
}) {
  return If(
    Exists(Function(name)),
    Update(Function(name), { body, role }),
    CreateFunction({ name, body, role })
  )
}

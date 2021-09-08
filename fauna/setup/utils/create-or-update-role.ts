import { CreateRole, Exists, If, Role, Update } from 'faunadb'

// A convenience function to either create or update a role.
export function CreateOrUpdateRole({
  name,
  membership,
  privileges,
}: {
  name: string
  membership?: unknown[]
  privileges: unknown[]
}) {
  return If(
    Exists(Role(name)),
    Update(Role(name), { membership, privileges }),
    CreateRole({ name, membership, privileges })
  )
}

import { Client, Expr } from 'faunadb'

export type Executor = (
  expr: Expr,
  entity: string
) => Promise<void | Record<string, any>>

export const makeExecutor =
  (client: Client): Executor =>
  (expr: Expr, entity: string) => {
    return client
      .query(expr)
      .then((data) => {
        console.log(`   [ Executed ] '${entity}'`)
        return data
      })
      .catch((error) => {
        if (error && error.message === 'instance already exists') {
          console.warn(`   [ Skipped ] '${entity}', it already exists`)
        } else {
          console.error(`   [ Failed  ] '${entity}', with error:`, error)
        }
      })
  }

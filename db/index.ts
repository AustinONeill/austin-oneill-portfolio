import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

export type Db = ReturnType<typeof createDb>

export function createDb(connectionString: string) {
  const sql = postgres(connectionString, {
    max: 1,           // Hyperdrive owns the pool; Worker needs exactly 1 connection
    idle_timeout: 20,
    connect_timeout: 10,
  })
  return drizzle(sql, { schema })
}

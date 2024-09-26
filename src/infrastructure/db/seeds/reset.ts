import { db } from '..'
import { addresses, members, schools, users } from '../schema'

async function reset() {
  await db.delete(members)
  await db.delete(users)
  await db.delete(schools)
  await db.delete(addresses)
}

reset()

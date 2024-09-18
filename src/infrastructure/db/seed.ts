import { Crypt } from '~/domain/shared/crypt'
import { Identify } from '~/domain/shared/identify'
import { db } from '.'
import { members, schools, users } from './schema'

async function seed() {
  await db.delete(members)
  await db.delete(users)
  await db.delete(schools)

  const schoolTb = await db
    .insert(schools)
    .values([
      {
        id: Identify.cuid2(),
        name: 'Escola Teste 1',
        email: 'escola1@teste.com',
        phone: '85988764563',
        taxId: '87654768000198',
      },
      {
        id: Identify.cuid2(),
        name: 'Escola Teste 2',
        email: 'escola2@teste.com',
        phone: '85988345726',
        taxId: '88760902000198',
      },
    ])
    .returning()

  const userTb = await db
    .insert(users)
    .values([
      {
        id: Identify.cuid2(),
        name: 'Escola Teste 1',
        email: schoolTb[0].email,
        password: Crypt.hash('secret'),
      },
      {
        id: Identify.cuid2(),
        name: 'Escola Teste 2',
        email: schoolTb[1].email,
        password: Crypt.hash('secret'),
      },
      {
        id: Identify.cuid2(),
        name: 'User Teste 1',
        email: 'user1@teste.com',
        password: Crypt.hash('secret'),
      },
      {
        id: Identify.cuid2(),
        name: 'User Teste 2',
        email: 'user2@teste.com',
        password: Crypt.hash('secret'),
      },
      {
        id: Identify.cuid2(),
        name: 'User Teste 3',
        email: 'user3@teste.com',
        password: Crypt.hash('secret'),
      },
      {
        id: Identify.cuid2(),
        name: 'User Teste 4',
        email: 'user4@teste.com',
        password: Crypt.hash('secret'),
      },
    ])
    .returning()

  await db.insert(members).values([
    { role: 'admin', schoolId: schoolTb[0].id, userId: userTb[0].id },
    { role: 'admin', schoolId: schoolTb[1].id, userId: userTb[1].id },
    { role: 'user', schoolId: schoolTb[0].id, userId: userTb[2].id },
    { role: 'user', schoolId: schoolTb[0].id, userId: userTb[3].id },
    { role: 'user', schoolId: schoolTb[1].id, userId: userTb[4].id },
    { role: 'user', schoolId: schoolTb[1].id, userId: userTb[5].id },
  ])
}

seed()

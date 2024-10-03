import { eq } from 'drizzle-orm'

import type { UserGateway } from '~/application/gateways/user.gateway'

import { User } from '~/domain/entities/user'

import type { Role } from '~/application/shared/role'
import { db } from '..'
import { members, users } from '../schema'

export class UserRepository implements UserGateway {
  async findByPhone(phone: string): Promise<User | null> {
    try {
      const user = await db.select().from(users).where(eq(users.phone, phone))

      if (user.length === 0) return null

      return User.instance(
        {
          name: user[0].name,
          email: user[0].email,
          phone: user[0].phone,
          password: user[0].password,
          activedAt: user[0].activedAt ?? undefined,
          createdAt: user[0].createdAt,
        },
        user[0].id
      )
    } catch (error) {
      console.error('UserRepository[findByPhone] Error:', error)
      return null
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await db.select().from(users).where(eq(users.email, email))

      if (user.length === 0) return null

      return User.instance(
        {
          name: user[0].name,
          email: user[0].email,
          phone: user[0].phone,
          password: user[0].password,
          activedAt: user[0].activedAt ?? undefined,
          createdAt: user[0].createdAt,
        },
        user[0].id
      )
    } catch (error) {
      console.error('UserRepository[findByEmail] Error:', error)
      return null
    }
  }

  async create(user: User, schoolId: string, role: Role): Promise<void> {
    try {
      await db.transaction(async tx => {
        const data = await tx
          .insert(users)
          .values([
            {
              id: user.id,
              ...user.props,
            },
          ])
          .returning({ id: users.id })

        await tx
          .insert(members)
          .values([{ userId: data[0].id, schoolId, role }])
      })
    } catch (error) {
      console.error('UserRepository[create] Error:', error)
    }
  }
}

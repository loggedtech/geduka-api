import { eq } from 'drizzle-orm'
import type { SchoolGateway } from '~/application/gateways/school.gateway'
import { School } from '~/domain/entities/school'
import { db } from '..'
import { schools } from '../schema'

export class SchoolRepository implements SchoolGateway {
  async findByTaxId(taxId: string): Promise<School | null> {
    try {
      const school = await db
        .select()
        .from(schools)
        .where(eq(schools.taxId, taxId))

      if (school.length === 0) return null

      return School.instance(
        {
          name: school[0].name,
          email: school[0].email,
          phone: school[0].phone,
          taxId: school[0].taxId,
          addressId: school[0].addressId,
          createdAt: school[0].createdAt,
        },
        school[0].id
      )
    } catch (error) {
      console.error('SchoolRepository[findByTaxId] Error:', error)
      return null
    }
  }

  async findByPhone(phone: string): Promise<School | null> {
    try {
      const school = await db
        .select()
        .from(schools)
        .where(eq(schools.phone, phone))

      if (school.length === 0) return null

      return School.instance(
        {
          name: school[0].name,
          email: school[0].email,
          phone: school[0].phone,
          taxId: school[0].taxId,
          addressId: school[0].addressId,
          createdAt: school[0].createdAt,
        },
        school[0].id
      )
    } catch (error) {
      console.error('SchoolRepository[findByPhone] Error:', error)
      return null
    }
  }

  async findByEmail(email: string): Promise<School | null> {
    try {
      const school = await db
        .select()
        .from(schools)
        .where(eq(schools.email, email))

      if (school.length === 0) return null

      return School.instance(
        {
          name: school[0].name,
          email: school[0].email,
          phone: school[0].phone,
          taxId: school[0].taxId,
          addressId: school[0].addressId,
          createdAt: school[0].createdAt,
        },
        school[0].id
      )
    } catch (error) {
      console.error('SchoolRepository[findByEmail] Error:', error)
      return null
    }
  }

  async create(school: School): Promise<void> {
    try {
      await db.insert(schools).values([
        {
          id: school.id,
          ...school.props,
        },
      ])
    } catch (error) {
      console.error('SchoolRepository[create] Error:', error)
    }
  }
}

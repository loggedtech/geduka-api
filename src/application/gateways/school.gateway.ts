import type { School } from '~/domain/entities/school'

export interface SchoolGateway {
  findByTaxId(taxId: string): Promise<School | null>
  findByPhone(phone: string): Promise<School | null>
  findByEmail(email: string): Promise<School | null>
  create(school: School): Promise<void>
}

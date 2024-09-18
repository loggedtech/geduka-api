import type { School } from '~/domain/entities/school'

export interface SchoolGateway {
  findByTaxId(taxId: string): Promise<School>
  create(school: School): Promise<void>
}

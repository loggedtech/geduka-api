import type { School } from '~/domain/entities/school'
import type { Either } from '~/domain/shared/either'
import type { UseCase } from '~/domain/shared/usecase'

import type { SchoolGateway } from '../gateways/school.gateway'
import type { BadRequest } from '../shared/notify'

export type CreateSchoolInput = {
  name: string
  email: string
  phone: string
  taxId: string
}

export type CreateSchoolOutput = Either<BadRequest, School>

export class CreateSchoolUseCase
  implements UseCase<CreateSchoolInput, CreateSchoolOutput>
{
  constructor(private readonly schoolGateway: SchoolGateway) {}

  execute(input: CreateSchoolInput): Promise<CreateSchoolOutput> {
    const { name, email, phone, taxId } = input
  }
}

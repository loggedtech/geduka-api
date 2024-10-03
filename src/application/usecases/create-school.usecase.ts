import { type Either, left, right } from '~/application/shared/either'
import type { UseCase } from '~/application/shared/usecase'

import { School } from '~/domain/entities/school'

import type { SchoolGateway } from '../gateways/school.gateway'
import { BadRequest } from '../shared/notify'

export type CreateSchoolInput = {
  name: string
  email: string
  phone: string
  taxId: string
  addressId: string
}

export type CreateSchoolOutput = Either<BadRequest, School>

export class CreateSchoolUseCase
  implements UseCase<CreateSchoolInput, CreateSchoolOutput>
{
  constructor(private readonly schoolGateway: SchoolGateway) {}

  async execute(input: CreateSchoolInput): Promise<CreateSchoolOutput> {
    const { name, email, phone, taxId, addressId } = input

    const schoolAlreadyExistsByEmail =
      await this.schoolGateway.findByEmail(email)

    if (schoolAlreadyExistsByEmail) {
      return left(BadRequest.send('Email already exists'))
    }

    const schoolAlreadyExistsByTaxId =
      await this.schoolGateway.findByTaxId(taxId)

    if (schoolAlreadyExistsByTaxId) {
      return left(BadRequest.send('TaxId already exists'))
    }

    const schoolAlreadyExistsByPhone =
      await this.schoolGateway.findByPhone(phone)

    if (schoolAlreadyExistsByPhone) {
      return left(BadRequest.send('Phone already exists'))
    }

    const school = School.instance({ name, email, phone, taxId, addressId })

    await this.schoolGateway.create(school)

    return right(school)
  }
}

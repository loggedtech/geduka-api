import { School } from '~/domain/entities/school'
import { User } from '~/domain/entities/user'
import { type Either, left, right } from '~/domain/shared/either'
import type { Service } from '~/domain/shared/service'

import type { SchoolGateway } from '../gateways/school.gateway'
import type { UserGateway } from '../gateways/user.gateway'
import { BadRequest, Created } from '../shared/notify'

export type CreateAccountInput = {
  name: string
  email: string
  phone: string
  password: string
  taxId: string
}

export type CreateAccountOutput = Either<BadRequest, Created>

export class CreateAccountService
  implements Service<CreateAccountInput, CreateAccountOutput>
{
  constructor(
    private readonly userGateway: UserGateway,
    private readonly schoolGateway: SchoolGateway
  ) {}

  async execute({
    name,
    email,
    phone,
    password,
    taxId,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    const schoolAlreadyExists = await this.schoolGateway.findByTaxId(taxId)

    if (schoolAlreadyExists) {
      return left(BadRequest.send('School already exists'))
    }

    const school = School.instance({
      name,
      email,
      phone,
      taxId,
    })

    await this.schoolGateway.create(school)

    const user = User.instance({
      name,
      email,
      password,
    })

    await this.userGateway.create(user, school.id)

    return right(Created.send('Account created successfully'))
  }
}
